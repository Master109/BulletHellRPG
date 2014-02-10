#pragma strict

var sceneID = 0;
var destination : Vector2;

function Awake ()
{
	Application.DontDestroyOnLoad(GameObject.Find("Player"));
	Application.DontDestroyOnLoad(GameObject.Find("Main Camera"));
}

function Start ()
{
	
}

function Update ()
{
	
}

function OnTriggerStay2D (other : Collider2D)
{
	if (other.gameObject.tag == "Player")
	{
		if (Input.GetAxisRaw("Interact") == 1)
		{
			Application.LoadLevel(sceneID);
			GameObject.Find("Player").transform.position = destination;
		}
	}
}