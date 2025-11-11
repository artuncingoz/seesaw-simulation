# seesaw-simulation

This is a seesaw simulation for represent the seesaw in html, css and js.

I used Javascript, CSS and HTML for creating this seesaw project

## What have ı done :)

At the very beginning of the question, I first created the structure. I took each seesaw element apart and saw how many parts it consisted of.

Afterward, I experimented with CSS to see what I could do to make these pieces visually smooth and good for seesaw. By making the triangular areas at the top left and right of the pivot transparent, I made the pivot appear triangular and realistic.

Afterwards, I added a seesaw, a reset button and text blocks with left and right weights. And also Added Weight Balls.

Then I added the total torque and the direction of the torque. I also added a text element to the HTML showing the weight of the next ball.

And added some sound effect for droping weights and clicking the buttons.

Added  pause button and add pause flag for check game is paused or not into js file.

## The Bugs And Solutions

Some of the errors I encountered were:

1. The pivot wasn't showing as a triangle.

To resolve this, I made the top left and right corners of the pivot transparent, like a triangle.

2. When adding weights, they were below the board.

I added padding to the balls, based on the board's base height and moved the weights 50% to the left so that any point on the board I clicked to add a weight was exactly at the bottom center of the weight.

3. Weights only added when ı clicked on the board should have add the weight, but clicking on the weights added a weight in the opposite position.

To resolve this, I disabled clicking on the balls with the cursor.
