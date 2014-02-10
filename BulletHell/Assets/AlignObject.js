#pragma strict

function Start ()
{
	transform.position.x = Mathf.RoundToInt(transform.position.x);
	transform.position.y = Mathf.RoundToInt(transform.position.y);
	Destroy(this);
}

function Update ()
{
	
}