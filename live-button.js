        var live_box = "";
        var newJson;
        var checkloop;
        
        function retags(tags){
            var length = localStorage.length;
            for (var i = 0; i < length; ++i) 
            {
                tags[i] = window.localStorage.key(i);
            } // end for
            //console.log(tags);
            tags.sort();
        }
        function playmus()
        {
            var tags = new Array();
            var playornot = true;
            retags(tags);
                for(var tag in tags)
                {
                    var time = window.localStorage.getItem(tags[tag]);//JSON.parse(localStorage.getItem(tags[tag]));
                    var timenow = new Date();
                    if(time != "favorite" || !time);
                    {
                        //console.log(typeof(Date.parse(time)));
                        if(timenow.getTime() - Date.parse(time)> 0)
                        {
                            //var rebutton = document.getElementById("live-button");
                            var mus = $("#beep")[0];
                            if(playornot)
                            {
                                playornot = false;
                                clearInterval(checkloop);
                                mus.play();
                                setTimeout(function(){
                                    mus.pause();
                                    mus.currentTime = 0;
                                    setTimeout(function(){
                                        $("#live-button").trigger('click');
                                        checkloop = setInterval("playmus()",3000);
                                    },8000);
                                },5500);
                                //window.localStorage.removeItem(tags[tag]);
                            }
                            //console.log("right:"+tag);
                            //console.log("delete");
                            window.localStorage.removeItem(tags[tag]);
                            //retags(tags);
                            
                        }
                    }
                }
        }
        $(document).ready(function(){
            $('div.display').on("mouseover",".upcoming-video",function(){
                //console.log($(this+">div.remind"));
                $(this).find('.remind').css("visibility","");
            });
            $('div.display').on("mouseout",".upcoming-video",function(){
                //console.log($(this).find('.heart').attr("title") != "mark");
                if($(this).find('.bell').attr("title") != "mark")
                {
                    $(this).find('.bell').css("visibility","hidden");
                }
                if($(this).find('.heart').attr("title") != "mark")
                {
                    //console.log($(this).find('.heart').attr("title"));
                    $(this).find('.heart').css("visibility","hidden");
                }
                //$(this).find('.remind').hide();
            });
            $('div.display').on("click",".bell",function(event){
                var pic = $(this).find('img');
                var th = this;
                if(pic.attr('src') == 'bell-off.svg')
                {
                    $(th).attr("title","mark");
                    //console.log(th.title);
                    pic.attr('src',"bell.svg");
                    //console.log("ccc:"+pic.attr('id'));
                    if(!window.localStorage.getItem(pic.attr('id')))
                    {
                        $.each(newJson["upcoming"],function(i,field){
                            if(field.yt_video_key == $(th).attr('id'))
                            {
                                window.localStorage.setItem(field.yt_video_key,field.live_schedule);
                            }
                        });

                    }
                }
                else
                {
                    //console.log($(th).attr("class"));
                    $(th).attr("title","");
                    pic.attr('src',"bell-off.svg");
                    window.localStorage.removeItem($(th).attr('id'));
                }
                //retags(tags);
                event.preventDefault();
            });
            $('div.display').on("click",".heart",function(event){
                var pic = $(this).find('img');
                var th = this;
                var cmptime = new Date();
                if(pic.attr('src') == 'heart.svg')
                {
                    pic.attr('src',"heart1.svg");
                    
                    $.each(newJson["upcoming"],function(i,field){
                        
                        if(field.channel.id == $(th).attr('id').split("-")[0])
                        {
                            //console.log($(th).attr('id'));
                            $("#"+field.yt_video_key).find("img").attr("src","bell.svg");
                            $("#"+field.yt_video_key).attr("title","mark");
                            $("#"+field.yt_video_key).css("visibility","");
                            $("#"+field.channel.id+"-"+field.yt_video_key).find("img").attr("src","heart1.svg");
                            $("#"+field.channel.id+"-"+field.yt_video_key).attr("title","mark");
                            $("#"+field.channel.id+"-"+field.yt_video_key).css("visibility","");
                            if(!window.localStorage.getItem(field.yt_video_key) && Date.parse(field.live_schedule) - cmptime.getTime() <= 259200000)
                                window.localStorage.setItem(field.yt_video_key,field.live_schedule);
                            if(!window.localStorage.getItem(field.channel.id))
                                window.localStorage.setItem(field.channel.id,"favorite");
                        }
                    });

                }
                else
                {
                    $.each(newJson["upcoming"],function(i,field){
                        
                        if(field.channel.id == $(th).attr('id').split("-")[0])
                        {
                            //console.log($(th).attr('id'));
                            $("#"+field.yt_video_key).find("img").attr("src","bell-off.svg");
                            $("#"+field.yt_video_key).attr("title","");
                            $("#"+field.channel.id+"-"+field.yt_video_key).find("img").attr("src","heart.svg");
                            $("#"+field.channel.id+"-"+field.yt_video_key).attr("title","");
                            window.localStorage.removeItem(field.yt_video_key);
                        }
                    });
                    window.localStorage.removeItem($(th).attr('id').split("-")[0]);
                }
                //retags(tags);
                event.preventDefault();
            });
            checkloop = setInterval("playmus()",3000);
        });
        $(document).ready(function(){
            //window.localStorage.clear();
            /*setTimeout(function(){
                var mus = $("#beep")[0];
                mus.play();
            setTimeout(function(){
                mus.pause();
                mus.currentTime = 0;
            },5500);

            },10000);*/
            var refresh = setInterval(function(){
                var re = document.getElementById("live-button");
                //console.log("refresh!");
                re.click();
            },600000);
            var length = localStorage.length; // clear localstorage
            var tags = []; // create empty array

            // load all keys
            for (var i = 0; i < length; ++i) 
            {
                tags[i] = window.localStorage.key(i);
            } // end for
            tags.sort(); // sort the keys
            for (var tag in tags) 
            {
                var time = window.localStorage.getItem(tags[tag]);//JSON.parse(localStorage.getItem(tags[tag]));
                var timenow = new Date();
                //console.log(Boolean("favorite" == time));
                if(time != "favorite");
                {
                    //console.log("store:"+Date.parse(time));
                    //console.log("now:"+timenow.getTime());
                    if(timenow.getTime() - Date.parse(time) > 180000)
                    {
                        //console.log("rererere");
                        window.localStorage.removeItem(tags[tag]);
                    }
                }
                
            }//end clear localstorage
            $("#live-button").click(function(){
                live_box = ""
                var now = new Date();
                $("div.display").empty();
                $.getJSON("https://api.holotools.app/v1/live", function(result){
                    newJson = result;
                    $.each(result["live"], function(i, field){
                        var timeLag = parseInt(now.getTime()-Date.parse(field.live_schedule));
                        var hour = Math.floor(timeLag/1000/60/60%24),min = Math.floor(timeLag/1000/60%60),sec = Math.floor(timeLag/1000%60);
                        if(hour < 10)
                            hour = "0" + hour;
                        if(min < 10)
                            min = "0" + min;
                        if(sec < 10)
                            sec = "0" + sec;
                        live_box += "<div class = 'video-box .container'><a target='_blank' class = 'live-a' href = 'https://www.youtube.com/watch?v=" +field.yt_video_key+"'><div>"
                                + "<div class = 'video-img .container-fluid'><img class = 'vedio-pic' src = 'https://i.ytimg.com/vi/" + field.yt_video_key +"/mqdefault.jpg'>"
                                + "<div class = 'vtuber-img'><img class = 'rounded-circle vtuber-pic' src = '" +field.channel.photo+"'></div></div>";
                                live_box += "<div class='video-title'>"+ field.title+"</div><div class = 'continue-time'><img src = 'clock.svg'>"+"  "+hour+":"+min+":"+sec+"</div>";

                        live_box += "</div></a></div>";
                        
                    });
                    result["upcoming"].sort(function (a, b) {
                        //console.log(a.live_schedule +" : " + b.live_schedule);
                        return Date.parse(a.live_schedule) - Date.parse(b.live_schedule);
                    });
                    //console.log(result["upcoming"]);
                    live_box += "<hr style='background-color:gray;height:1px;border:none;'>";
                    $.each(result["upcoming"], function(i, field){
                        var timeLag = parseInt(Date.parse(field.live_schedule) - now.getTime());
                        //console.log(timeLag);
                        //var hour = Math.floor(timeLag/1000/60/60%24),min = Math.floor(timeLag/1000/60%60),sec = Math.floor(timeLag/1000%60);
                        if(timeLag > Math.floor(1000*60*60*24*30))
                            live_box += "";
                        else
                        {
                            live_box += "<div id = 'upcoming-video' class = 'upcoming-video video-box .container'><a target='_blank' class = 'live-a' href = 'https://www.youtube.com/watch?v=" +field.yt_video_key+"'><div>"
                                + "<div class = 'video-img .container-fluid'><img class = 'vedio-pic' src = 'https://i.ytimg.com/vi/" + field.yt_video_key +"/mqdefault.jpg'>"
                                + "<div class = 'vtuber-img'><img class = 'rounded-circle vtuber-pic' src = '" +field.channel.photo+"'></div>";
                            //console.log(Boolean(window.localStorage.getItem("asd")));
                            //console.log(Boolean(window.localStorage.getItem(field.yt_video_key)));
                            var cmptime = new Date();
                            if(!Boolean(window.localStorage.getItem(field.channel.id)))
                            {
                                live_box += "<div class = 'remind heart' id = '"+field.channel.id+"-"+field.yt_video_key+"'style='visibility:hidden'><img class = 'remind-img' src = 'heart.svg' alt = 'heart.svg'></div>";
                                
                            }
                            else if(Date.parse(field.live_schedule) >= cmptime.getTime())
                            {
                                live_box += "<div class = 'remind heart' id = '"+field.channel.id+"-"+field.yt_video_key+"'title = 'mark'><img class = 'remind-img' src = 'heart1.svg' alt = 'heart1.svg'></div>";
                                if(!Boolean(window.localStorage.getItem(field.yt_video_key)))
                                    window.localStorage.setItem(field.yt_video_key,field.live_schedule);
                            }
                            if(!Boolean(window.localStorage.getItem(field.yt_video_key)))
                            {
                                live_box += "<div class = 'remind bell' id = '"+field.yt_video_key+"'style='visibility:hidden'><img src = 'bell-off.svg' alt = 'bell-off.svg' class = 'remind-img'></div>";
                            }
                            else
                            {
                                live_box += "<div class = 'remind bell' id = '"+field.yt_video_key+"'title = 'mark'><img src = 'bell.svg' alt = 'bell.svg' class = 'remind-img'></div>";
                            }
                            
                            //$(".remind").hide();
                            live_box += "</div><div class='video-title'>"+ field.title+"</div>";
                            if(timeLag > Math.floor(1000*60*60*24) && timeLag < Math.ceil(1000*60*60*24*30))
                                live_box += "<div class = 'in-how-long'>" + Math.ceil(timeLag/1000/60/60/24%30) + "天內</div>";
                            else if(timeLag > Math.floor(1000*60*60) && timeLag < Math.ceil(1000*60*60*24))
                                live_box += "<div class = 'in-how-long'>" + Math.ceil(timeLag/1000/60/60%24) + "小時內</div>";
                            else if(timeLag > Math.floor(1000*60) && timeLag < Math.ceil(1000*60*60))
                                live_box += "<div class = 'in-how-long'>" + Math.ceil(timeLag/1000/60%60) + "分鐘內</div>";
                            else if(timeLag < Math.floor(1000*60))
                                live_box += "<div class = 'in-how-long'>即將開始</div>";
                            var schedule = new Date(field.live_schedule);
                            var minute = schedule.getMinutes();
                            if(schedule.getMinutes() < 10)
                                    minute = "0"+minute;
                                live_box += "<div class = 'in-how-long'>" + schedule.getFullYear() + "年" + (schedule.getMonth()+1)+"月"+schedule.getDate() +"日"+schedule.getHours()+":"+ minute+"</div>";
                                live_box += "</div></a></div>";
                            
                        }
                    
                    //console.log(live_box);
                    //$("div.display").append(live_box);
                });
                live_box += "<hr style='background-color:gray;height:1px;border:none;'>";
                    result["ended"].sort(function (a, b) {
                        //console.log(a.live_schedule +" : " + b.live_schedule);
                        return Date.parse(a.live_end) - Date.parse(b.live_end);
                    });
                $.each(result["ended"], function(i, field){
                    live_box += "<div class = 'video-box .container'><a target='_blank' class = 'live-a' href = 'https://www.youtube.com/watch?v=" +field.yt_video_key+"'><div>"
                            + "<div class = 'video-img .container-fluid'><img class = 'vedio-pic' src = 'https://i.ytimg.com/vi/" + field.yt_video_key +"/mqdefault.jpg'>"
                            + "<div class = 'vtuber-img'><img class = 'rounded-circle vtuber-pic' src = '" +field.channel.photo+"'></div></div>";
                            live_box += "<div class='video-title'>"+ field.title+"</div>";
                    var schedule = new Date(field.live_end);
                    var minute = schedule.getMinutes();
                    if(schedule.getMinutes() < 10)
                        minute = "0"+minute;
                    live_box += "<div class = 'in-how-long'>" + schedule.getFullYear() + "年" + (schedule.getMonth()+1)+"月"+schedule.getDate() +"日"+schedule.getHours()+":"+ minute+"</div>";
                    live_box += "</div></a></div>";
                    
                });
                $("div.display").append(live_box);
                    //console.log(live_box);
                    //$("div.display").append(live_box);
                });
            });
        });
        $(document).ready(function(){
            $("div.skr").animate({
                opacity: '0.3'
            });
            $("div#start-box").animate({
                opacity: '1'
            });
            $("div#start-box").one("click",function(){
                $(document.body).css({
                    "overflow-x":"auto",
                    "overflow-y":"auto"
                });
                $("#start-text").hide(400);
                $("div.skr").animate({
                    opacity: '1'
                });
                $("div#start-box").animate({
                    left: '+=50%',
                    top: '+=49.5%'
                });
                $("#start-img").attr("src","peko-whole_body.png");
                $("#start-img").css("width","100px");
                $("#start-img").css("height","200px");
                $("#start-box").attr("id","peko");
                $(document).scroll(function(){
                    $("div#peko").stop();
                    var scollval = $(this).scrollTop();
                    $("div#peko").animate({
                        top: 520 + scollval+'px'
                    });
                });
                $(document).mouseup(function (e) {          //card動畫取消設定
                    var container = $(".card"); // 這邊放你想要排除的區塊
                    //console.log("mouseup");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        container.hide();
                        $(".skr").stop();
                        $(".skr").animate({
                            opacity: "1"
                        })
                        $(".card .cardbody").hide();
                        $(".card .cardheader span").hide();
                    }
                });
            });
            
        });