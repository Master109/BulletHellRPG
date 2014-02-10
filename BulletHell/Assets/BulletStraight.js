#pragma strict

var vel : Vector2;
var speed = 0.2;
var madeByPlayer = false;
var spinRateY = 0.0;
var spinRateZ = 0.0;
var range = 75;
var shootLoc : Vector2;
var damage = 1;

function Start ()
{
	shootLoc = transform.position;
	vel = Vector2.ClampMagnitude(vel, speed);
}

function Update ()
{
	transform.position += vel;
	transform.rotation.eulerAngles.y += spinRateY;
	transform.rotation.eulerAngles.z += spinRateZ;
	if (Vector2.Distance(transform.position, shootLoc) >= range)
		Destroy(gameObject);
}

function OnTriggerEnter2D (other : Collider2D)
{
	if (other.gameObject.tag == "Collider")
		Destroy(gameObject);
	else if (other.gameObject.tag == "Enemy" && madeByPlayer)
	{
		Destroy(gameObject);
		other.gameObject.GetComponent(Enemy).hp -= damage;
		if (other.gameObject.GetComponent(Enemy).hp <= 0 && !other.gameObject.animation.isPlaying && !other.gameObject.GetComponent(Enemy).dead)
		{
			other.gameObject.GetComponent(Enemy).OnDeath();
			//Destroy(other.gameObject);
		}
	}
	else if (other.gameObject.tag == "Player" && !madeByPlayer)
	{
		Destroy(gameObject);
		other.transform.parent.gameObject.GetComponent(Player).hp -= damage;
		if (other.transform.parent.gameObject.GetComponent(Player).hp <= 0)
		{
			Destroy(other.transform.parent.gameObject);
			Destroy(GameObject.Find("Main Camera"));
			Application.LoadLevel(0);
		}
	}
}