#pragma strict

var zoomRate = .5;
var minZoom = 0;
var maxZoom = 250;

function Start ()
{
	
}

function Update ()
{
	if (Input.GetAxis("Zoom") == -1 && camera.orthographicSize > minZoom)
		camera.orthographicSize -= zoomRate;
	else if (Input.GetAxis("Zoom") == 1 && camera.orthographicSize < maxZoom)
		camera.orthographicSize += zoomRate;
}