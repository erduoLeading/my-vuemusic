const  request = require("request");
const {JSDOM} = require("jsdom");
const {songTable} = require("./songTable")

module.exports={
    getSongDetail:function (req,res,err) {
        // eslint-disable-next-line no-console
        console.log("getSongDetail api 运行")
        let body= JSON.parse(Object.keys(req.body)[0]);//s 数据在对象的第一个key,数据格式转化 req.body: {'{"mid":"12324"}': 0}
		// eslint-disable-next-line no-console
		console.log("body:",req.body)
		// eslint-disable-next-line no-console
		console.log("body:",req.body)
        songTable.find({
            songMid:body.mid
        }).then((data)=>{
            // eslint-disable-next-line no-console
            console.log(Number(data));
            if (Number(data) === 0) {
                // eslint-disable-next-line no-console
                console.log("此时数据库中无数据");
                request({
                    method:"GET",
                    url:"https://i.y.qq.com/v8/playsong.html",
                    qs:{
                        songmid:body.mid,
						ADTAG:'newyqq.song'
                    },
                    headers:{
                        "user-agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
                    }
                },function (err,response,body) {
					let dom = new JSDOM(body,{runScripts:"dangerously"}); //数据存储位置window.songLIst,若报错，可能名字被替换
                    // eslint-disable-next-line no-console
                    console.log(dom.window.songlist);
                    let songData=dom.window.songlist[0];
                    let finalData={
                        songMid:songData.songmid,
                        m4aUrl:songData.m4aUrl,
                        songName:songData.songname,
                        playTime:songData.playTime,
                        songPic:songData.pic
                    };
                    // eslint-disable-next-line no-console
                    console.log(finalData);
                    res.send(finalData);
                    songTable.create(
                        finalData
                    )
                });
            } else {
                // eslint-disable-next-line no-console
                console.log("此时数据库中有数据");
                res.send(data);
            }
        })
    }
}