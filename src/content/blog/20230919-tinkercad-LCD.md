---
title: 'Tinkercad-LCD without any library'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: '2023-09-19T01:09:01.514Z'
heroImage: '/images/tinkercad-LCD.png'
categories: ['test']
tags: ['LCD', 'arduino', 'tinkercad']
author: '["robby.roboter"]'
---
<iframe width="725" height="453" src="https://www.tinkercad.com/embed/gl60gJqKHqG?editbtn=1" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">
</iframe>

```cpp
// Read the datasheet https://www.youtube.com/watch?v=cXpeTxC3_A4

#define DELEAY 2
#define EN 1
#define DATAMODE 0b0010 // 4 bit data mode
#define CLEAR_1 0b0000
#define CLEAR_2 0b0001
#define RET_1 0b0000
#define RET_2 0b0010
#define ON_1 0b0000
#define ON_2 0b1100

#define H_1 0b0100
#define H_2 0b1000

#define I_1 0b0100
#define I_2 0b1001


void setup()
{
  DDRD = B11111111; // set PORTD (digital 7~0) to outputs
  DDRB = B11111111; // set PORTD (digital 7~0) to outputs
  DDRC = B11111111; // set PORTD (digital 7~0) to outputs
}

void loop()
{
  command(DATAMODE);

  command(ON_1);
  command(ON_2);
  while(1)
  {
    command(CLEAR_1);
    command(CLEAR_2); 

    ch(H_1);
    ch(H_2);

    ch(I_1);
    ch(I_2);
  }
 
}

void command(int command)
{
  PORTC = B0;
  PORTD = command;
  PORTB = B1;
  delay(DELEAY);
  PORTB = B0;
}

void ch(int ch)
{
  PORTD = ch;
  PORTC = B1;
  PORTB = B1;
  delay(DELEAY);
  PORTB = B0;
}
```