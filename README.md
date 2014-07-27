datGravity
==========

Welcome to datGravity, a complete restart to [gravity](http://github.com/Guard13007/gravity).

datGravity is a simple 2D gravitational simulation with aspirations of being a
cool game.

It is recommended you do not change stuff outside of Render Settings, as changes
outside of there will cause weird things to happen and/or break.

ToDo Immediate
--------------

- [ ] Write System()
- [x] Fix things to deal with ships (physics and render)

ToDo Long Term
--------------

- [ ] Rewrite Bodies portion of GUI (ultimately I want a separate GUI entirely for
      /a/ Body, and just a way to select them in the main GUI)
- [ ] Redo player controls to rotation and throttle

- [ ] Write GUI.addBody(b)

Known Bugs
----------

- Render / controls freak out if you modify focusID while focusType is ship.
