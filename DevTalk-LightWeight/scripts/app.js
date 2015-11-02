var waypoint = new Waypoint({
  element: document.getElementById('content'),
  handler: function(direction) {
	var devTalkHeader = document.querySelector("devtalk-header");
	if(direction == "down") {
		devTalkHeader.collapse();
	} else {
		devTalkHeader.expand();
	}
  },
  offset: 275
});