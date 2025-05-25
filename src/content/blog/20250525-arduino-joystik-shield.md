---
title: 'Arduino joystick shield'
description: 'Quick and easy way to create joystick for remote controlled car'
pubDate: '2025-05-25T21:28:32.000Z'
heroImage: '/images/20250525-joystick/joystick.png'
categories: ['ARDUINO']
tags: ['ARDUINO', 'Joystick', 'shield']
author: '["robby.roboter"]'
---


#### 🚀 Explore the Arduino Joystick Shield!
This versatile shield features a 2-axis joystick with a built-in push button, multiple tactile buttons (A–F), and headers for I2C, serial, and analog connections. It even includes a dedicated interface for a Nokia 5110 (PCD8544) LCD display and support for the nRF24L01 wireless module, making it perfect for creating remote controls, game controllers, and interactive projects.

#### 👉 Whether you’re building a robot, wireless gamepad, or display interface, this shield is packed with possibilities.
🎮 Watch the video for a full walkthrough and demo!


```c
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>
#include <Wire.h>
#include <SPI.h>
//#include <dht.h>

// For LCD from DX.com (https://forum.arduino.cc/index.php?topic=322642.0)
#define RST 12
#define CE 13
#define DC 11
#define DIN 10
#define CLK 9

// Arduino digital pins associated with buttons
const byte PIN_BUTTON_A = 2;
const byte PIN_BUTTON_B = 3;
const byte PIN_BUTTON_C = 4;
const byte PIN_BUTTON_D = 5;
const byte PIN_BUTTON_E = 6;
const byte PIN_BUTTON_F = 7;

// Arduino analog pins associated with joystick
const byte PIN_ANALOG_X = 0;
const byte PIN_ANALOG_Y = 1;

Adafruit_PCD8544 display = Adafruit_PCD8544(CLK, DIN, DC, CE, RST);

int valX = 0;
int valY = 0;

void setup() {
  Serial.begin(57600);

  // Setup: display
  display.begin();
  display.setContrast(63);  // adjust display contrast
  display.clearDisplay();

  // Define text size and color
  display.setTextSize(1);
  display.setTextColor(BLACK);

  // Joystick Coordinate X
  display.drawRoundRect(0, 0, 44, 24, 3, 2);
  // Initial text
  display.setCursor(6, 3);  // Set cursor position
  display.println("- X -");
  display.setCursor(5, 14);
  display.println(" ");
  display.setCursor(29, 14);

  // Joystick Coordinate Y
  display.drawRoundRect(45, 0, 39, 24, 3, 2);
  // Initial text
  display.setCursor(50, 3);
  display.println("- Y -");
  display.setCursor(50, 14);
  display.println(" ");

  // Buttons pressed (matrix)
  display.drawRoundRect(0, 25, 84, 23, 3, 2);
  // Initial text
  display.setCursor(6, 28);
  display.println("- BUTTONS -");
  display.setCursor(10, 38);
  display.println(" ");
  display.display();

  delay(1000);

  // Setup: joystick shield
  pinMode(PIN_BUTTON_A, INPUT);
  digitalWrite(PIN_BUTTON_A, HIGH);

  pinMode(PIN_BUTTON_B, INPUT);
  digitalWrite(PIN_BUTTON_B, HIGH);

  pinMode(PIN_BUTTON_C, INPUT);
  digitalWrite(PIN_BUTTON_C, HIGH);

  pinMode(PIN_BUTTON_D, INPUT);
  digitalWrite(PIN_BUTTON_D, HIGH);

  pinMode(PIN_BUTTON_E, INPUT);
  digitalWrite(PIN_BUTTON_E, HIGH);

  pinMode(PIN_BUTTON_F, INPUT);
  digitalWrite(PIN_BUTTON_F, HIGH);
}

void loop() {
  // Update buttons states
  display.fillRect(4, 37, 72, 10, 0);
  display.setCursor(8, 38);

  Serial.print("Buttons A:");
  Serial.print(digitalRead(PIN_BUTTON_A));
  Serial.print(" ");
  if (digitalRead(PIN_BUTTON_A) == LOW) {
    display.print("A ");
  } else
    display.print("- ");

  Serial.print("B:");
  Serial.print(digitalRead(PIN_BUTTON_B));
  Serial.print(" ");
  if (digitalRead(PIN_BUTTON_B) == LOW) {
    display.print("B ");
  } else
    display.print("- ");

  Serial.print("C:");
  Serial.print(digitalRead(PIN_BUTTON_C));
  Serial.print(" ");
  if (digitalRead(PIN_BUTTON_C) == LOW) {
    display.print("C ");
  } else
    display.print("- ");

  Serial.print("D:");
  Serial.print(digitalRead(PIN_BUTTON_D));
  Serial.print(" ");
  if (digitalRead(PIN_BUTTON_D) == LOW) {
    display.print("D ");
  } else
    display.print("- ");

  Serial.print("E:");
  Serial.print(digitalRead(PIN_BUTTON_E));
  Serial.print(" ");
  if (digitalRead(PIN_BUTTON_E) == LOW) {
    display.print("E ");
  } else
    display.print("- ");

  Serial.print("F:");
  Serial.print(digitalRead(PIN_BUTTON_F));
  Serial.print(" -- ");
  if (digitalRead(PIN_BUTTON_F) == LOW) {
    display.print("F ");
  } else
    display.print("- ");

  display.println();

  valX = analogRead(PIN_ANALOG_X);
  valY = analogRead(PIN_ANALOG_Y);

  // Update position - Coordinate X
  display.fillRect(4, 13, 25, 10, 0);
  display.setCursor(4, 14);
  display.println(valX, 1);

  // Update position - Coordinate Y
  display.fillRect(50, 13, 23, 10, 0);
  display.setCursor(50, 14);
  display.println(valY, 1);

  Serial.print("Position X:");
  Serial.print(valX);
  Serial.print(", ");
  Serial.print("Y:");
  Serial.print(valY);
  Serial.print(" ");
  Serial.println();

  display.display();

  delay(200);
}
```