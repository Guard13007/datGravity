datGravity
==========

Welcome to datGravity, a complete restart to [gravity](http://github.com/Guard13007/gravity).

datGravity is a simple 2D gravitational simulation with aspirations of being a
cool game.

It is recommended you do not change stuff outside of Render Settings, as changes
outside of there will cause weird things to happen and/or break.

ToDo
----

- [x] Make Render object actually used for the canvas and its current settings
- [ ] Write GUI.addBody(b)
- [ ] Write Game.generateNewSystem() and actually start using it!
- [ ] Redo System() and sys to split into Systems, Render, Game.
      (Game.player should be player, Game.system should be current system)
- [ ] Figure out how to load/save/remember settings (and presets) for dat.GUI?
- [ ] Rewrite Bodies portion of GUI (ultimately I want a separate GUI entirely for
      /a/ Body, and just a way to select them in the main GUI)
- [ ] Redo player controls to rotation and throttle
- [ ] Make dat.GUI custom placed and make canvas full screen

Known Bugs
----------

Does not work in IE (probably). There is some code in one place to work in IE,
but there is at least one place I know doesn't work, and I am not worried about
fixing it unless I go much farther with this.
