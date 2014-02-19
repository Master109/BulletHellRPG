#pragma strict

var vel : Vector2;
var speed = 0.2;
var madeByPlayer = false;
var spinRateY = 0.0;
var spinRateZ = 0.0;
var range = 75;
var shootLoc : Vector2;
var damage = 1;
var lifeTimer = 0;
var follow = false;
var deathTime = 300;
var velChangeMax = 0.02;

function Start ()
{
	shootLoc = transform.position;
	vel = Vector2.ClampMagnitude(vel, speed);
}

function Update ()
{
	if (follow)
	{
		lifeTimer += 1 * Time.timeScale;
		if (lifeTimer >= deathTime)
			Destroy(gameObject);
		var velChange : Vector2 = GameObject.Find("Hitbox").transform.position - transform.position;
		velChange *= 99999;
		velChange = Vector2.ClampMagnitude(velChange, velChangeMax);
		vel += velChange;
		vel *= 99999;
		vel = Vector2.ClampMagnitude(vel, speed);
		transform.rotation = Quaternion.FromToRotation(Vector2.up, vel);
	}
	else if (Vector2.Distance(transform.position, shootLoc) >= range)
		Destroy(gameObject);
	transform.position += vel * Time.timeScale;
	transform.rotation.eulerAngles.y += spinRateY * Time.timeScale;
	transform.rotation.eulerAngles.z += spinRateZ * Time.timeScale;
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