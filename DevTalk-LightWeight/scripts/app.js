var waypoint = new Waypoint({
  element: document.getElementById('main-content'),
  handler: function(direction) {
	var devTalkHeader = document.querySelector("devtalk-header");
	if(direction == "down") {
		devTalkHeader.collapse();
	} else {
		devTalkHeader.expand();
	}
  }
});