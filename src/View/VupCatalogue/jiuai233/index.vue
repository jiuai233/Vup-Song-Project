<template>
  <div class="box">
    <div class="temp">
      <div class="body">
        <div class="avatar">
        </div>
      </div>
    </div>
    <div class="main-body">
      <div class="main-body-borad">
        <p class="p-style">
          米凝Meaning的歌单
        </p>
      </div>
      <div class="line-box">
        <div class="line">
        </div>
      </div>
    </div>
    <div class="Song-List">
      <song-list
          :objdata="objdata"
          :out_side_color="'1'"
          :in_side_color="'1'"
      ></song-list>
    </div>
  </div>
</template>

<script>
import SongList from "@/View/Compoents/SongList";
import axios from "axios";
export default {
  name: "Box",
  components: {
    SongList
  },
  data(){
    return{
      objdata:{
        radio:'全部歌曲', //用作默认选择
        type_list:[],
        songlist_json:{},
        songlist:[],
        song_list_index:[],
        song_list_type:[],
        reg_type:[],
        linshi_type:[],
        artist_list:[],
        song_more_list:[]
      }
    }
  },
  mounted() {
    axios.post("http://1.117.60.203/query.php",{vup:'meaning'}).then((response) => {
      let item;
      this.objdata.songlist_json = response.data.data
      var reg = /[\u4e00-\u9fa5]{2,5}|\w{2,}|!\s|\w*[\u4e00-\u9fa5]\w*/gm; //正则
      for (item in response.data.data2){ //用来做导航栏的曲风遍历
        for(const i in response.data.data2[item]['类型'].match(reg)){//通过data2里拿下来的去重类型进行正则筛选
          this.objdata.linshi_type.push(response.data.data2[item]['类型'].match(reg)[i])//match出来的列表进行逐一扔进临时_type里
        }
      }
      this.objdata.linshi_type.unshift('全部歌曲') //推一个全部歌曲在类型列表里，要不然导航栏里不显示
      this.objdata.type_list = new Set(this.objdata.linshi_type); //直接对临时_type去重，赋值给type_list
      //下面是显示歌单用作的遍历
      for(let item in this.objdata.songlist_json){
        this.objdata.song_list_index.push(this.objdata.songlist_json[item]['歌曲'])  //显示歌单歌曲的遍历
        this.objdata.song_list_type.push(this.objdata.songlist_json[item]['类型'])//用来做歌单类型的曲风遍历
        this.objdata.artist_list.push(this.objdata.songlist_json[item]['歌手'])//用来做歌单类型的曲风遍历
        this.objdata.song_more_list.push(this.objdata.songlist_json[item]['备注'])//用来做歌单类型的曲风遍历
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  background: linear-gradient(to left top,rgb(252, 200, 153) 50%, rgb(255, 239, 150) 100%);
}
.temp {
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body {
  width: 242px;
  height: 242px;
  opacity: 1;
  border-radius: 50%;
  background: url("../../../assets/image.webp");
  border: 14px solid rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 90%;
  height: 90%;
  border-radius: 1000px;
  background-size: cover
}
.main-body-borad {
  font-family: me;
  text-align: center;
  text-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.25);
  /** 文本1 */
  font-size: 24px;
  font-weight: 400;
  line-height: 50px;
  color: rgb(41, 40, 40);
  display: flex;
  justify-content: center;
}
.line {
  height: 1px;
  border-radius: 10px;
  width: 70%;
  border: 3px solid rgba(166, 166, 166, 1);
  margin: 50px 0;
}
.line-box {
  display: flex;
  justify-content: center;
}
.Song-List {
  display: flex;
  justify-content: center;
}
.p-style {
  color: rgba(0, 0, 0, 0.616);
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.171);
  font-family: me;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }

}
</style>