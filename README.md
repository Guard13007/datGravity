datGravity
==========

Welcome to datGravity, a complete restart to [gravity](http://github.com/Guard13007/gravity).

datGravity is a simple 2D gravitational simulation with aspirations of being a
cool game. With ships and planets and space stations to fly, orbit, land, mine, and science.

It is recommended you do not change stuff outside of Render Settings, as changes
outside of there will cause weird things to happen and/or break.

ToDo Immediate
--------------

- [ ] add throttle control to player, and rotation controls

- [ ] I need to approach this from a different perspective. Instead of making constructors for
      parts and such, I need to just make a bunch of example parts for either random generation
      of parts or user-created parts, decide on a UI and how to dynamically build them, then
      create constructors to handle these once the design is ready?

ToDo Intermediate
-----------------

- [ ] Add a minimap with a preset zoom (but options to change it, including dynamicly changing)
- [ ] Take the RCS image and use it to create thruster animations
- [ ] Make fuel resources a thing, fuel consumption

ToDo Long Term
--------------

- [ ] Make an editor for creating ships
- [ ] Make a collider for ship to body collisions
- [ ] Rewrite Bodies portion of GUI (ultimately I want a separate GUI entirely for
      /a/ Body, and just a way to select them in the main GUI)
- [ ] Write GUI.addBody(b)

Known Bugs
----------

- Render / controls freak out if you modify focusID while focusType is ship.

#### stuff do

- debug.js, environment.js, functions.js, main.js, random.js, rendering.js, variables.js,
  todo.md, Console.md, README.md, everything above JS folder
