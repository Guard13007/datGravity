datGravity
==========

Welcome to datGravity, a complete restart to [gravity](http://github.com/Guard13007/gravity).

datGravity is a simple 2D gravitational simulation with aspirations of being a
cool game.

It is recommended you do not change stuff outside of Render Settings, as changes
outside of there will cause weird things to happen and/or break.

ToDo Immediate
--------------

- [ ] Write System() to generate randomly
- [ ] add throttle control to player, and rotation controls

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
