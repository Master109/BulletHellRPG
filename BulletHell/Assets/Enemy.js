#pragma strict

var speed = .5;
var shootTimer = 0;
var shootRate = 10;
var bullet : GameObject;
var go : GameObject;
var hp = 3;
var awakeRange = 75;
var awake = false;
var attackRange = -1;
var dead = false;
var gos : GameObject[];

function Start ()
{
	if (attackRange == -1)
		attackRange = bullet.GetComponent(BulletStraight).range;
}

function Update ()
{
	if (!awake)
	{
		gos = GameObject.FindGameObjectsWithTag("Beacon");
		var closestBeaconToPlayer = 0;
		for (var i2 = 0; i2 < gos.Length; i2 ++)
			if (Vector2.Distance(GameObject.Find("Player").transform.position, gos[i2].transform.position) < Vector2.Distance(GameObject.Find("Player").transform.position, gos[closestBeaconToPlayer].transform.position) && Vector2.Distance(gos[i2].transform.position, GameObject.Find("Player").transform.position) < gos[i2].transform.lossyScale.x / 2)
				closestBeaconToPlayer = i2;
		if (Vector2.Distance(transform.position, GameObject.Find("Player").transform.position) < awakeRange || (gos.Length > 0 && Vector2.Distance(gos[closestBeaconToPlayer].transform.position, transform.position) < gos[closestBeaconToPlayer].transform.lossyScale.x / 2 && Vector2.Distance(GameObject.Find("Player").transform.position, gos[closestBeaconToPlayer].transform.position) && Vector2.Distance(gos[closestBeaconToPlayer].transform.position, GameObject.Find("Player").transform.position) < gos[closestBeaconToPlayer].transform.lossyScale.x / 2))
			awake = true;
		return;
	}
	if (Vector2.Distance(transform.position, GameObject.Find("Player").transform.position) >= attackRange)
	{
		var vel = GameObject.Find("Player").transform.position - transform.position;
		vel = Vector2.ClampMagnitude(vel, speed);
		var offsetVel = GameObject.Find("Player").transform.position - transform.position;
		offsetVel = Vector2.ClampMagnitude(offsetVel, 5.75);
		var hit : RaycastHit2D[] = Physics2D.RaycastAll(Vector2(transform.position.x, transform.position.y - 1.9) + offsetVel, vel, speed, 1);
	var hitEnemy = false;
	for (var i = 0; i < hit.Length; i ++)
	{
		if (hit[i].collider.gameObject.tag == "Enemy")
		{
			hitEnemy = true;
			break;
		}
	}
	if (!hitEnemy)
		transform.position += vel;
	}
	else if (shootTimer > shootRate)
	{
		go = GameObject.Instantiate(bullet, Vector2(transform.position.x, transform.position.y), Quaternion.Euler(0, 0, Random.Range(0, 360)));
		go.GetComponent(BulletStraight).vel = GameObject.Find("Player").transform.position - transform.position;
		shootTimer = 0;
	}
	shootTimer ++;
	if (dead && !animation.isPlaying)
		Destroy(gameObject);
}

function OnDeath ()
{
	animation.Play();
	dead = true;
}

function OnTriggerStay2D (other : Collider2D)
{
	if (other.gameObject.tag == "Enemy" && other.gameObject != gameObject)
	{
		var vel = transform.position - other.gameObject.transform.position;
		vel = Vector2.ClampMagnitude(vel, .2);
		transform.position += vel;
	}
}