#pragma strict

var speed = .5;
var shootTimer = 0;
var shootRate = 10;
var bullet : GameObject;
var go : GameObject;
var hp = 10;

function Start ()
{
	
}

function Update ()
{
	var vel = Vector2();
	if (Input.GetAxisRaw("Focus") == 1)
	{
		GameObject.Find("Hitbox Visualizer").renderer.enabled = true;
		speed = .3;
	}
	else
	{
		GameObject.Find("Hitbox Visualizer").renderer.enabled = false;
		speed = .6;
	}
	if (Input.GetAxisRaw("Horizontal") == 1)
		vel.x = speed;
	else if (Input.GetAxisRaw("Horizontal") == -1)
		vel.x = -speed;
	if (Input.GetAxisRaw("Vertical") == 1)
		vel.y = speed;
	else if (Input.GetAxisRaw("Vertical") == -1)
		vel.y = -speed;
	vel = Vector2.ClampMagnitude(vel, speed);
	var hit : RaycastHit2D[] = Physics2D.RaycastAll(transform.position, vel, speed, 1);
	var hitCube = false;
	for (var i = 0; i < hit.Length; i ++)
	{
		if (hit[i].collider.gameObject.tag == "Collider")
		{
			hitCube = true;
			break;
		}
	}
	if (!hitCube)
		transform.position += vel;
	shootTimer ++;
	if (shootTimer > shootRate && Input.GetAxisRaw("Fire") == 1)
	{
		go = GameObject.Instantiate(bullet, transform.position, Quaternion.FromToRotation(Vector2.up, Vector2.up));
		go.GetComponent(BulletStraight).vel = Vector2.up;
		go.GetComponent(BulletStraight).madeByPlayer = true;
		//go = GameObject.Instantiate(bullet, transform.position, Quaternion.Euler(0, 0, Random.Range(0, 360)));
		//go.GetComponent(BulletStraight).vel = Vector2(-1, 1);
		//go.GetComponent(BulletStraight).madeByPlayer = true;
		//go = GameObject.Instantiate(bullet, transform.position, Quaternion.Euler(0, 0, Random.Range(0, 360)));
		//go.GetComponent(BulletStraight).vel = Vector2(1, 1);
		//go.GetComponent(BulletStraight).madeByPlayer = true;
		go = GameObject.Instantiate(bullet, transform.position, Quaternion.FromToRotation(Vector2.up, Vector2(-.5, 1)));
		go.GetComponent(BulletStraight).vel = Vector2(-.5, 1);
		go.GetComponent(BulletStraight).madeByPlayer = true;
		go = GameObject.Instantiate(bullet, transform.position, Quaternion.FromToRotation(Vector2.up, Vector2(.5, 1)));
		go.GetComponent(BulletStraight).vel = Vector2(.5, 1);
		go.GetComponent(BulletStraight).madeByPlayer = true;
		go = GameObject.Instantiate(bullet, transform.position, Quaternion.FromToRotation(Vector2.up, Vector2(-.25, 1)));
		go.GetComponent(BulletStraight).vel = Vector2(-.25, 1);
		go.GetComponent(BulletStraight).madeByPlayer = true;
		go = GameObject.Instantiate(bullet, transform.position, Quaternion.FromToRotation(Vector2.up, Vector2(.25, 1)));
		go.GetComponent(BulletStraight).vel = Vector2(.25, 1);
		go.GetComponent(BulletStraight).madeByPlayer = true;
		shootTimer = 0;
	}
}