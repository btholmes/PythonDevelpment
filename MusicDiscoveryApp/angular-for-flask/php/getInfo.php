<?php
/**
 * Created by IntelliJ IDEA.
 * User: btholmes
 * Date: 10/15/16
 * Time: 1:52 PM
 */

$fileContents = file_get_contents("../../playlists.txt");

if(!$fileContents){
    echo "Nothing was there";
}else{
    echo $fileContents;
}
