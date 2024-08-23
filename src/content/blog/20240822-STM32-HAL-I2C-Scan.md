---
title: "STM32 HAL I2C Scanner"
description: 'scanning trough I2C bus to get all devices addresses'
pubDate: "2024-08-22T15:20:00"
heroImage: '/images/20240822-STM32-HAL-I2CScan/STM32I2CScanPreview.png'
categories: ['STM32']
tags: ['STM32', 'HAL', 'I2C']
author: '["robby.roboter"]'
---

#### We need to configure <abbr title="Serial Wire Viewer">`SWO`</abbr> output

The function is implementation of a `_write` function for sending data, typically for debugging purposes. The code is specifically designed to send characters through the Instrumentation Trace Macrocell (<abbr title="Instrumentation Trace Macrocell">`ITM`</abbr>) interface. The `ITM` is a component of the `ARM` `Cortex-M` microcontroller family, used for sending trace data to an external debugger or another host system.

1. We need to include define in beginning of a file `main.c`
```c
/* USER CODE BEGIN Includes */
#include <string.h>
/* USER CODE END Includes */
```

2. This should go under `/* USER CODE BEGIN 4 */`
```c
/* Send a char through ITM */
int _write(int file, char *ptr, int len)
{
  int DataIdx;
  for (DataIdx = 0; DataIdx < len; DataIdx++)
  {
    ITM_SendChar(*ptr++);
  }
  return len;
}
/* USER CODE END 4 */
```
### Debug setting in `STM32` `CubeIDE`

![STM32 CubeIDE Enamble](/images/20240822-STM32-HAL-I2CScan/STM32EnableSWV.png)
* You need to open this window first `Window` => `Show wiew` => `SWV` => `SWV ITM Data Console`
![STM32 CubeIDE SWV Settings](/images/20240822-STM32-HAL-I2CScan/STM32CubeIDESWVSettings.png)


### I2C_Scan

The `I2C_Scan` function is a commonly used function in embedded systems to scan the `I2C` bus for devices. It attempts to communicate with all possible `I2C` addresses and identifies those that respond, indicating the presence of a device at that address. The function is particularly useful during the development phase to detect and troubleshoot connected `I2C` devices.

add this to `/* USER CODE BEGIN 4 */` section as well
```c

void I2C_Scan(void) 
{
	printf("Scanning I2C bus:\r\n");
	HAL_StatusTypeDef result;
	uint8_t i;
	for (i = 1; i < 128; i++) 
    {
		/*
		 * the HAL wants a left aligned i2c address
		 * &hi2c1 is the handle
		 * (uint16_t)(i<<1) is the i2c address left aligned
		 * retries 2
		 * timeout 2
		 */
		result = HAL_I2C_IsDeviceReady(&hi2c1, (uint16_t) (i << 1), 2, 2);
		if (result != HAL_OK) // HAL_ERROR or HAL_BUSY or HAL_TIMEOUT
		{
			printf("."); // No ACK received at that address
		}
		if (result == HAL_OK) 
        {
			printf("0x%X", i); // Received an ACK at that address
			sprintf(test, "0x%X\n", i);
			HAL_UART_Transmit(&huart2, (uint8_t*) test, strlen(test), 5);
		}
	}
	printf("\r\n");
}
```

### Detailed Explanation:

1. Initial Print Statement:

```c
printf("Scanning I2C bus:\r\n");
```
 * This line prints a message to indicate that the `I2C` scanning process has started. `\r\n` is used to insert a newline, moving the cursor to the next line in the console output.

2. Variable Declarations:

```c
HAL_StatusTypeDef result;
uint8_t i;
```
   * `HAL_StatusTypeDef result;`: This variable will store the result of each attempt to communicate with an `I2C` device. `HAL_StatusTypeDef` is a type defined by the `STM32` `HAL` (Hardware Abstraction Layer) library, representing the status of `HAL` operations (e.g., `HAL_OK`, `HAL_ERROR`, `HAL_BUSY`, `HAL_TIMEOUT`).
   * `uint8_t i;`: This variable is an 8-bit unsigned integer that will serve as a counter in the for loop, representing potential `I2C` addresses.

3. For Loop (Scanning I2C Addresses):

```c
for (i = 1; i < 128; i++) {
```
* The loop iterates through all possible 7-bit `I2C` addresses, starting from `1` to `127`. Address `0` is typically reserved and not used for normal `I2C` communications.

4. Checking Device Readiness:

```c
result = HAL_I2C_IsDeviceReady(&hi2c1, (uint16_t) (i << 1), 2, 2);
```
* `HAL_I2C_IsDeviceReady` is a `HAL` function that checks if an `I2C` device at a given address is ready for communication (i.e., it sends an address and waits for an acknowledgment, or `ACK`, from a device).
* `&hi2c1`: This is the `I2C` handle, a structure that contains all the information required to manage `I2C` communication on the microcontroller.
* `(uint16_t)(i << 1)`: The `I2C` address must be left-aligned in the register. The `i << 1` operation shifts the address to the left by `1 bit`, making it left-aligned, and it is cast to `uint16_t`.
* `2`: The function retries twice if the device doesn't respond.
* `2`: Timeout duration in milliseconds for each communication attempt.

5. Result Evaluation:

* Device Not Ready:

```c
if (result != HAL_OK) {
    printf("."); // No ACK received at that address
}
```
* If the result is not `HAL_OK`, meaning no acknowledgment (`ACK`) was received from the device, it prints a dot (`.`) to indicate that no device is present at the address.

* Device Ready:

```c
    if (result == HAL_OK) {
        printf("0x%X", i); // Received an ACK at that address
        sprintf(test, "0x%X", i);
        HAL_UART_Transmit(&huart2, (uint8_t*) test, strlen(test), 100);
    }
```
* If the result is `HAL_OK`, indicating that the device at the given address responded with an `ACK`:
	* It prints the `I2C` address in hexadecimal format.
	* `sprintf(test, "0x%X", i);`: The address is formatted into a string and stored in the test buffer.
	* `HAL_UART_Transmit(&huart2, (uint8_t*) test, strlen(test), 100);`: This line sends the formatted address over `UART` using the `HAL_UART_Transmit` function, allowing the address to be transmitted to another device (like a computer) for logging or further analysis.

6. Completion Print Statement:

```c
printf("\r\n");
```
* After the loop completes and all addresses have been scanned, this line prints a newline to signify the end of the scan.

#### Summary of Functionality:

The `I2C_Scan` function scans all potential `I2C` addresses (1 through 127) on the `I2C` bus associated with the `hi2c1` handle. For each address, it checks if a device is ready (i.e., responds to the address). If a device is found, it prints the address in hexadecimal format and transmits the address over `UART` and `ITM`. If no device is found at a given address, it prints a dot. This is useful for debugging and validating that the correct devices are connected and communicating over the `I2C` bus.


### Now we need to connect something to `I2C`

![STM32 I2C connection](/images/20240822-STM32-HAL-I2CScan/lcd_i2c-min.webp)

### And run our code in `DEBUG` mode

![STM32 I2C scan result](/images/20240822-STM32-HAL-I2CScan/STM32I2CScanResult.png)