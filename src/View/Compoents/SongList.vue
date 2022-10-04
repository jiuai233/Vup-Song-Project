<template>
  <div class="Song-list">
    <div class="Song-list-main">
      <div class="Song-list-main-body" :class="[
          out_side_color?'out-side-color--'+out_side_color:'',
      ]">
        <ul class="Song-list-main-header-ul">
          <li v-for="item in this.objdata.type_list" :key="item" @click="show_item(item)">
            <el-button   round>
              {{item}}
            </el-button>
          </li>
        </ul>
        <div class="main-body-main-title"
             :class="[
                  in_side_color?'in-side-color--'+in_side_color:''
             ]"
        >
          <div class="main-body-main-title-song">
            <h2>歌曲</h2>
          </div>
          <div class="main-body-main-title-class">
            <h2>歌手</h2>
          </div>
          <div class="main-body-main-title-class">
            <h2>类型</h2>
          </div>
          <div class="main-body-main-title-class">
            <h2>备注</h2>
          </div>
        </div>
        <div class="main-body-main-cotent">
          <div class="main-body-main-cotent-ul">
            <!-- 歌曲 -->
            <ul class="ul">
              <li v-for="(item,index) in this.objdata.song_list_index" :key="index"  @click="copy_song_name(index);copy_song_name(index)" class="song-list-item song-list-item-left">{{item}}</li>
            </ul>
          </div>
          <div class="main-body-main-cotent-ul">
            <!-- 歌手 -->
            <ul class="ul">
              <li v-for="(item,index) in this.objdata.artist_list" :key="index"  class="song-list-item">{{item}}</li>
            </ul>
          </div>
          <div class="main-body-main-cotent-ul">
            <!-- 类型 -->
            <ul class="ul">
              <li v-for="(item,index) in this.objdata.song_list_type" :key="index" class="song-list-item">{{item}}</li>
            </ul>
          </div>
          <div class="main-body-main-cotent-ul">
            <!-- 备注 -->
            <ul class="ul">
              <li v-for="(item,index) in this.objdata.song_more_list" :key="index"   class="song-list-item">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SongList",
  data(){
    return{
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
  },
  props:{
    objdata:{
      type:Object
    },
    out_side_color:{
      type:String,
      default:''
  },
    in_side_color:{
      type:String,
      default: ''
    }
  },
  methods:{
    show_item(item){
      this.radio=item
    },
    copy_song_name(val){
      let song_name = this.song_list_index[val]
      this.$copyText(`${"点歌"+" "+song_name}`)
      this.$message.success(`${"复制成功"+"歌曲："+song_name}`)
    }
  },
  mounted() {
    this.type_list.push("全部歌曲");
    this.reg_type.push("全部歌曲");
  },watch:{  //监听用户选择变化，如果有变化获取新值之后做新的循环遍历
    radio(newval){
      let item;
      const pattern = new RegExp(newval);
      this.songlist=[];
      this.song_list_index = [];
      this.song_list_type = [];
      this.song_more_list = [];
      this.artist_list = [];

      for(item in this.songlist_json){
        if(pattern.test(this.songlist_json[item]['类型'])){ //对选择后的歌单进行遍历
          this.song_list_index.push(this.songlist_json[item]['歌曲']);
          this.artist_list.push(this.songlist_json[item]['歌手']);
          this.song_list_type.push(this.songlist_json[item]['类型']);
          this.song_more_list.push(this.songlist_json[item]['备注']);
        }
        else if(newval=== '全部歌曲'){
          this.song_list_index.push(this.songlist_json[item]['歌曲']);
          this.artist_list.push(this.songlist_json[item]['歌手']);
          this.song_list_type.push(this.songlist_json[item]['类型']);
          this.song_more_list.push(this.songlist_json[item]['备注']);
        }
      }
    }

  },
}
</script>

<style scoped>
.Song-list {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Song-list-main {
  width: 100%;
  background:rgb(255, 255, 255);
  min-height: 700px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 3px 12px 4px rgba(0, 0, 0, 0.35);
}
.Song-list-main-header {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 10px 0;
  height: 80px;
  border-radius:20px;
}
.Song-list-main-body {
  width: 85%;
  margin: 50px 0;
  background: rgb(203, 230, 253);  /*主框颜色*/
  border-radius: 20px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.Song-list-main-header-ul {
  margin: 20px 0;
  display: flex;
  width: 90%;
  align-items: center;
  flex-flow: row wrap
}
.Song-list-main-header-ul > li {
  margin: 5px;
  width: 150px;
  color: rgb(0, 0, 0);
}
.Song-list-main-header-ul > li:hover {
  cursor: pointer;
  color: white;
}
.main-body-main-cotent {
  width: 90%;
  background: rgb(245,253,253);  /*歌单列表里的颜色 */
  margin: 30px 40px;
  border-radius: 15px;
  display: flex;
}
.main-body-main-cotent-ul {
  flex: 1;
  display: flex;
  justify-content: center;
}
.main-body-main-cotent-ul> ul >li:hover {
  color: rgb(186,233,233);
}
.main-body-main-title {
  width: 90%;
  max-height: 50px;
  background: rgb(153, 205, 252); /*四栏的颜色*/
  margin: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
.main-body-main-title-song ,.main-body-main-title-class{
  font-family: me;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-button {
  width: 100px;
}
.ul > li {
  width: 120px;
  height: 70px;
  overflow: hidden;
  word-wrap:break-word;
  white-space:pre-wrap;
  text-overflow: ellipsis;
}


.color1 {

}


</style>