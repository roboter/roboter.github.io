---
title: "WCH ssd1306 oled display"
description: 'driver for oled display ssd1306'
pubDate: "2023-12-03T12:10:47.520Z"
heroImage: '/images/20231203-wch/wch.jpg'
categories: ['WCH']
tags: ['WCH', 'c', 'ssd1306', 'I2C']
author: '["robby.roboter"]'
---

![Alt text](/images/20231203-wch/embeetle.png)

I took as a starting point already existing project that use `CH32V003`
[ch32v003-maker-projects](https://pallavaggarwal.in/2023/10/26/ch32v003-maker-projects/)
It have big numbers and some text but I wanted to display any text.


![Alt text](/images/20231203-wch/schematic.svg)

```c
// ===================================================================================
// Update Function
// ===================================================================================
void update(void) {
	OLED_drawPixel(0, 0, 1);
	char str[] = "Hello World!\n";
	OLED_print(&str);
	OLED_update();
}

int main(void)
{
	Delay_Init();
	USART_Printf_Init(115200);
	printf("SystemClk:%d\r\n",SystemCoreClock);
	
	// Setup internal peripherals
  I2C_init();

  // Setup external peripherals
  OLED_init();
  OLED_clear();
  update();

  Delay_Ms(500);
}

```
## Source code
https://github.com/roboter/Hardware/tree/main/WCH/ch32v003f4p6-evt-r0-1v1-i2c

## UPD! Embeetle integrated my project to their software so only 3 steps needed to run it

![Embeetle screenshot 01](/images/20231203-wch/screenshot_01.png)
![Embeetle screenshot 02](/images/20231203-wch/screenshot_02.png)
![Embeetle screenshot 03](/images/20231203-wch/screenshot_03.png)


## Reference: 
* https://www.youtube.com/watch?v=StjnSeM30-Y&list=PLs00gIc4luIDke2g0jVK1qH7EwiB-SKYP&index=12 - ssd1306 explained
* https://embeetle.com/#supported-hardware/wch/boards/ch32v003f4p6-evt-r0-1v1 - Embeetle
* https://github.com/ndm736/ME433_2020/tree/master/ssd1306  - Font
* https://pallavaggarwal.in/2023/10/26/ch32v003-maker-projects/ - took insperation from this project