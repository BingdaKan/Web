var mapdata =[[0,0,0,0],  
    [0,0,0,0],  
        [0,0,0,0],  
        [0,0,0,0]]; 

var highest = 0;

var Map = {   
    isFull : function(map){  
        var i , j;  
    },  
    draw : function(map,ctx){  
        var i , j , c ;
        var score = 0;

        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(410, 30, 180, 200);

        for(i = 0; i < map.length; i++ ){   
            for(j = 0; j < map[i].length; j++){ 
                score += map[i][j];
                if(map[i][j]==0){  
                    ctx.fillStyle='#eee4da';  
                    }  
                if(map[i][j]==2){  
                    ctx.fillStyle='#eee4da';  
                }
                if(map[i][j]==4){  
                    ctx.fillStyle='#ede0c8';  
                } 
                if(map[i][j]==8){  
                    ctx.fillStyle='#f2b179';  
                }
                if(map[i][j]==16){  
                    ctx.fillStyle='#f59563';  
                }
                if(map[i][j]==32){  
                    ctx.fillStyle='#f67c5f';  
                }
                if(map[i][j]==64){  
                    ctx.fillStyle='#f65e3b';  
                }
                if(map[i][j]==128){  
                    ctx.fillStyle='#edcf72';  
                } 
                if(map[i][j]==256){  
                    ctx.fillStyle='#edcc61';  
                }
                if(map[i][j]==512){  
                    ctx.fillStyle='#edc850';  
                }
                if(map[i][j]==1024){  
                    ctx.fillStyle='#edc53f';  
                }
                if(map[i][j]==2048){  
                    ctx.fillStyle='#edc22e';  
                }
                ctx.fillRect(j*100+10,i*100+10,80,80);
                if(map[i][j]>0){  
                    ctx.fillStyle='#000000';  
                    ctx.font = 'bold 48px Arial';  
                    ctx.textAlign = 'center';  
                    ctx.textBaseline = 'middle';  
                    ctx.fillText(''+map[i][j],j*100+50,i*100+50);  
                }  
            }  
        }

        ctx.fillStyle='#9E9E9E';  
        ctx.font = "bold 30px Helvetica Neue";
        ctx.fillText('Score',500,50);
        ctx.fillText(score,500,85);

        if(score > highest){
            highest = score;
        }

        ctx.beginPath();
        ctx.fillStyle='#9E9E9E';  
        ctx.font = "bold 30px Helvetica Neue";
        ctx.fillText('Highest Score',500,150);
        ctx.fillText(highest,500,200);  
    },  
          
    randomchesspieces : function(map){  
        var x , y , z , i ;  
        while(true){  
            x = Math.floor(Math.random()*4);  
            y = Math.floor(Math.random()*4);  
            z = 2;  
            if(Math.floor(Math.random()*10) > 7){  
                z = 4;  
            }  
            if(map[x][y] == 0){  
                map[x][y] = z;  
                break;  
            }  
        }  
    },  
      
};  
