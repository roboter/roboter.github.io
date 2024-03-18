---
title: 'LCD (HD44780) + Embeetle + SimulIDE'
description: 'Simulate simple LCD display with hitachi controller(HD44780).'
pubDate: '2024-03-16T16:03:01.514Z'
heroImage: '/images/20240316-SimulIDE/EmbeetleBig.gif'
categories: ['arduino']
tags: ['LCD', 'arduino', 'embeetle', 'HD44780', 'SimulIDE']
author: '["robby.roboter"]'
---

## [SimulIDE](https://simulide.com/)
`SimulIDE` is a cool tool to simulate analog and digital Circuits, Here how they describe itself on their site: `SimulIDE` is a simple real time electronic circuit simulator, intended for hobbyist or students to learn and experiment with analog and digital electronic circuits and microcontrollers.

The more important thing for me is: It supports `PIC`, `AVR`, `Arduino` and other MCUs and MPUs. 

![SimulIDE](/images/20240316-SimulIDE/SimulIDE.png)


## So lets build our own Circuit!

We need just 2 components `HD44780` and `nano`. We will do connections later so this step is compete.
![Components](/images/20240316-SimulIDE/components.png)

## [Embeetle](https://embeetle.com) IDE and LCD Library

`Embeetle` The clean and efficient IDE, tailor-made for your MCU. It supports different MCUs an it supports arduino `nano` board that we will use in this example.
![Embeetle Start Window](/images/20240316-SimulIDE/Embeetle-start.png)
We need to go into `Libraries` window.
![Embeetle Download Library](/images/20240316-SimulIDE/Embeetle-download-library.png)

And Search here for `PololuHD44780` Library
![Embeetle PololuHD44780 Library](/images/20240316-SimulIDE/Embeetle-PololuHD44780-Library.png)

After we install this library we need to go back to `Library` tab in startup screen.
For some reason it hides in `sensors` not `displays` section. And here we need to right-click to open sample menu and find `Test` project.

![Embeetle-PololuHD44780-Library-Simple-Projects-Test](/images/20240316-SimulIDE/Embeetle-PololuHD44780-Library-Simple-Projects-Test.png)

Importer window will appear where we need to select the right board `arduino-nano` and maybe change project name to `PololuHD44780-Test`
![Embeetle-PololuHD44780-Importer](/images/20240316-SimulIDE/Embeetle-PololuHD44780-Importer.png)

And click `Next` and after some time click `Finish` after importing is done we can build a our project.

![Embeetle-Build](/images/20240316-SimulIDE/Embeetle-Build.png)

We should see a build log with result:
```bash
Preparing: application.size
"/embeetle/beetle_tools/windows/gnu_avr_toolchain_7.3.0_32b/bin/avr-size" application.elf
   text    data     bss     dec     hex filename
   4452     182     179    4813    12cd application.elf
make.exe: Leaving directory 'E:/projects/PololuHD44780-Test/build'
/embeetle/beetle_tools/windows/gnu_make_4.2.1_64b/make.exe: exit code '0'
```

Now we need to check what connections we need to make, it described in comments in another example `BasicTest.ino` I will copy it here:
```c++
/* The pins specified below will need to be connected to your
LCD.  The pins are specified in this order:
RS, E, DB4, DB5, DB6, DB7. */
PololuHD44780 lcd(7, 6, 5, 4, 3, 2);
```
![Connections](/images/20240316-SimulIDE/Connections.png)

## Running firmware
Now we need to load `Firmware` to `SimulIDE` `nano` board, Righ-click on board to get a menu
![SimulIDE-Firmware](/images/20240316-SimulIDE/SimulIDE-Firmware.png)

We need to select `hex` file from `BasicTest\build` folder

![Application-HEX](/images/20240316-SimulIDE/Application-HEX.png)

### finally run
![SimulIDE-run](/images/20240316-SimulIDE/SimulIDE-run.png)

and ... nothing on a display ...

![SimulIDE-notworking](/images/20240316-SimulIDE/SimulIDE-notworking.png)

My wild guess is that `SimulIDE` does not know how to work with custom characters that this demo trying to display. We have 2 options here 1<sup>st</sup> go to step where select witch project to import and instead of `Test` choose `Basic-Test` or 2<sup>nd</sup> is go back to `Embeetle` and find `loop` function

```c
void loop()
{
  lcd.reinitialize();
  loadCustomCharacters();
```
and comment out call to `loadCustomCharacters`

```c
void loop()
{
  lcd.reinitialize();
  // loadCustomCharacters();
```

then `build` and load `firmware` in `SimulIDE` again, hit `RUN` and IT WORKS!

![SimulIDE-working](/images/20240316-SimulIDE/SimulIDE-working.png)
