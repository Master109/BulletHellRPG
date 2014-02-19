import System.Collections.Generic;

var paused : boolean = false; 
var pausedGUI : GUITexture;  
var gameName : String = "Your Game";

var myList = new List.<Transform>();

var loadedLevel = new ArrayList();

function Start()
{
	if(pausedGUI)
		pausedGUI.enabled = false;
}

function Update () 
{ 
    if(Input.GetKeyUp(KeyCode.P))
    { 
       paused = !paused;

	    if(paused == true){
	        Time.timeScale = 0.0;
	        if(pausedGUI) pausedGUI.enabled = true;
	    } else {
	        Time.timeScale = 1.0;
	        if(pausedGUI) pausedGUI.enabled = false;
	    }
   }
}

function OnGUI() {
	if(!paused)
	{
	   GUILayout.BeginArea(Rect(200,10,400,20));
	   GUILayout.BeginVertical();
	   GUILayout.BeginHorizontal();
	   GUILayout.FlexibleSpace();
	   GUILayout.Label("Press P to Pause");
	   GUILayout.FlexibleSpace();
	   GUILayout.EndHorizontal();
	   GUILayout.EndVertical();
	   GUILayout.EndArea();
	   return;
	}
	   
	var box : GUIStyle = "box";   
    GUILayout.BeginArea(Rect( Screen.width/2 - 200,Screen.height/2 - 300, 400, 625), box);

    GUILayout.BeginVertical(); 
    GUILayout.FlexibleSpace();
    if(GUILayout.Button("Save Game"))
    {
       LevelSerializer.SaveGame(gameName);
    }
    if (GUILayout.Button("Delete") && loadedLevel.Count > 0)
    {
    	loadedLevel[0].Delete();
    }
    if(GUILayout.Button("Resume"))
			{
				LevelSerializer.Resume();
			}
    GUILayout.Space(60);
    for(var sg in LevelSerializer.SavedGames[LevelSerializer.PlayerName]) { 
       if(GUILayout.Button(sg.Caption)) { 
         LevelSerializer.LoadNow(sg.Data);
         Time.timeScale = 1;
         loadedLevel.Clear();
         loadedLevel.Add(sg);
         } 
    } 
    GUILayout.FlexibleSpace();
    GUILayout.EndVertical();
    GUILayout.EndArea();


}