//(function() {

var Game = {  
    drawing : $('canvas'),  
          
    context : drawing.getContext('2d'),   
      
    initDrawing : function(){
        this.context.clearRect(0,0,drawing.width,drawing.height);   
        drawing.setAttribute('width',600);  
        drawing.setAttribute('height',410);  
        this.context.fillStyle = "#bbada0";  
        this.context.fillRect(0,0,drawing.width,drawing.height);
        Map.randomchesspieces(mapdata);  
        Map.randomchesspieces(mapdata);  
        Map.draw(mapdata,this.context);  
    },  
      
    initGame : function(){ 
        this.initDrawing();  
        this.Move(this.context);
    },  

    Move : function(ctx){ 
        var k;  
        var m = function(e){  
            var maptest = JSON.parse(JSON.stringify(mapdata));   
            var flag =Cp.left(maptest)||Cp.down(maptest)||Cp.right(maptest)||Cp.up(maptest);  
            if(!flag)  
                alert("Game Over!");  
            switch (e.keyCode) {  
                case 37:  
                    if(Cp.left(mapdata)){  
                        Map.randomchesspieces(mapdata);  
                        Map.draw(mapdata,ctx);  
                    }  
                    break;    
                case 38:  
                    if(Cp.up(mapdata)){  
                        Map.randomchesspieces(mapdata);  
                        Map.draw(mapdata,ctx);  
                        console.log("add,up");  
                    }  
                    break;  
                case 39:  
                    if(Cp.right(mapdata)){  
                        Map.randomchesspieces(mapdata);  
                        Map.draw(mapdata,ctx);  
                    }  
                    break;  
                case 40:  
                    if(Cp.down(mapdata)){  
                        Map.randomchesspieces(mapdata);  
                        Map.draw(mapdata,ctx);  
                        console.log("add,down");  
                    }  
                    break;  
            }  
        };  
        $(document).on("keyup",m);  
    }  
};

Game.initGame();
/*
var btn_start = document.getElementById("start");
btn_start.addEventListener('click', function(){
    mapdata =[[0,0,0,0],  
        [0,0,0,0],  
        [0,0,0,0],  
        [0,0,0,0]];
    Game.initGame();
    var highest = 0;
})*/


var mapdata =[[0,0,0,0],  
        [0,0,0,0],  
        [0,0,0,0],  
        [0,0,0,0]];

//var highest = 0;

var Map = {   
    isFull : function(map){  
        var i , j;  
    },  
    draw : function(map,ctx){  
        var i , j , c ;
        //var score = 0;
        /*ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(410, 30, 180, 200);

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
        ctx.fillText(highest,500,200); */

        for(i = 0; i < map.length; i++ ){   
            for(j = 0; j < map[i].length; j++){  
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

var Cp = {  
      
    up : function(map){  
        var i , j , t , k , flag;  
        flag = 0;  
        for ( i = 0; i < map.length; i++ ){  
            for( j = 0; j < map[i].length ; j++){  
                if(map[i][j] > 0){  
                    t = map[i][j];    
                    for( k = i-1; k >= 0; k--){  
                        if(map[k][j] > 0){  
                            if(map[k][j] == t){  
                                map[i][j]=0;  
                                map[k][j]+=t;  
                                flag = 1;  
                            }else{  
                                map[i][j]=0;  
                                map[k+1][j]=t;  
                                if(i != k+1){  
                                    flag = 1;  
                                }  
                            }  
                            break;  
                        }  
                        if(k==0){                             
                            map[i][j]=0;  
                            map[k][j]=t;  
                            if(i != k+1){  
                                flag = 1;  
                            }  
                        }  
                    }  
                }  
                  
            }             
        };  
        return flag;  
    },  
    down : function(map){  
        var i , j , t , k , flag;  
        flag = 0;  
        for ( i = map.length - 1; i >= 0 ; i-- ){  
            for( j = 0 ; j < map[i].length ; j++){  
                if(map[i][j] > 0){  
                    t = map[i][j];  
                    for( k = i+1; k < map.length; k ++){  
                        if(map[k][j] > 0){  
                            if(map[k][j] == t){  
                                map[i][j]=0;  
                                map[k][j]+=t;  
                                flag = 1;  
                            }else{  
                                map[i][j]=0;  
                                map[k-1][j]=t;  
                                if(i != k-1){  
                                    flag = 1;  
                                }  
                            }  
                            break;  
                        }  
                        if(k==map.length-1){                              
                            map[i][j]=0;  
                            map[k][j]=t;  
                            if(i != k+1){  
                                flag = 1;  
                            }  
                        }  
                    }  
                }  
                  
            }             
        };  
        return flag;  
    },  
    left : function(map){  
        var i , j , t , k , flag;  
        flag = 0;  
        for ( i = 0; i < map.length; i++ ){  
            for( j = 0; j < map.length ; j++){  
                if(map[i][j] > 0){  
                    t = map[i][j];  
                    for( k = j-1; k >= 0; k --){  
                        if(map[i][k] > 0){  
                            if(map[i][k] == t){  
                                map[i][j]=0;  
                                map[i][k]+=t;  
                                flag = 1;  
                            }else{  
                                map[i][j]=0;  
                                map[i][k+1]=t;  
                                if(j != k+1){  
                                    flag = 1;  
                                }  
                            }  
                            break;  
                        }  
                        if(k==0){                             
                            map[i][j]=0;  
                            map[i][k]=t;  
                            flag = 1;  
                        }  
                    }  
                }  
                  
            }             
        };  
        return flag;  
    },  
    right : function(map){  
        var i , j , t , k , flag;  
        flag = 0;  
        for ( i = 0; i < map.length; i++ ){  
            for( j = map[i].length-1; j >= 0 ; j--){  
                if(map[i][j] > 0){  
                    t = map[i][j];  
                    for( k = j+1; k < map[i].length; k ++){  
                        if(map[i][k] > 0){  
                            if(map[i][k] == t){  
                                map[i][j]=0;  
                                map[i][k]+=t;  
                                flag = 1;  
                            }else{  
                                map[i][j]=0;  
                                map[i][k-1]=t;  
                                if(j != k-1){  
                                    flag = 1;  
                                }  
                            }  
                            break;  
                        }  
                        if(k==map[i].length-1){                           
                            map[i][j]=0;  
                            map[i][k]=t;  
                            flag = 1;  
                        }  
                    }  
                }  
                  
            }             
        };  
        return flag;  
    }  
};  



//})();