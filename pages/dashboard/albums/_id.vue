<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <div class="main">
      <Block class="album"> 
        <AlbumDetail :album="album" @updateAlbum="updateAlbum"/>
      </Block>

      <Block class="album-musics scroll-height">
        <Block class="col-6 table-album-music" blockName="Musics in album">
          <input class="find" type="text" placeholder="Find music ...">
          <button class="find-btn">
            <i class="fas fa-search"></i>
          </button>
          <Table
            :data="(musicsAblum === undefined) ? [] : musicsAblum"
            :columns="columns1"
            :is-router-link="false"
            :router-builder="'/dashboard/musics/#{id}'"
            @handleActionRemove="handleActionRemove "
          />
        </Block>

        <Block class="col-6 table-album-music" blockName="Musics others">
          <input class="find" type="text" placeholder="Find music ...">
          <button class="find-btn">
            <i class="fas fa-search"></i>
          </button>
          <Table
            :data="musics"
            :columns="columns3"
            :is-router-link="false"
            :router-builder="'/dashboard/musics/#{id}'"
            @handleActionAdd="handleActionAdd "
          />
        </Block>
      </Block>

      <Block class="comments" blockName="List comments">
        <Table
          :data="(comments === undefined) ? [] : comments"
          :columns="columns2"
          :is-router-link="true"
          :router-builder="'/dashboard/musics/#{id}'"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang='ts'>
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator'
import ApiClient from '~/library/ApiClient';
import ZNotification from "@/library/z-notification"
// import ApiClient from '~/library/ApiClient';
import { Align, Column, Music, Comment } from '~/types';

@Component({
  middleware: ['check', 'notLogged'],
})
export default class id extends Vue {
  head() {
    return {
      title: 'Album Detail',
    }
  }

  columns1: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,  
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'author',
      title: 'Author',
      align: Align.Left,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'action-remove',
      title: 'Action',
      align: Align.Center,
    }
  ]

  columns2: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,  
    },
    {
      key: 'user_uid',
      title: 'User UID',
      align: Align.Left,
    },
    {
      key: 'content',
      title: 'Content',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Right,
    }
  ]

  columns3: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,  
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'author',
      title: 'Author',
      align: Align.Left,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'action-add',
      title: 'Action',
      align: Align.Center,
    }
  ]

  selected = 5
  pageName = 'Album Detail'
  album: any = null;
  comments: any = null;
  musicsAblum: any = null;
  musics: any = null;

  handleActionRemove(id: number) {
    const index = this.musicsAblum.findIndex((music: Music) => music.id === id)
    if(index === -1) {
      return
    }

    ZNotification.success({
      title: "Success",
      description: "Remove music from album successfully"
    })
    
    this.musics.push(this.musicsAblum[index]);
    this.musicsAblum.splice(index, 1);
  }

  handleActionAdd(id: number) {
    const index = this.musics.findIndex((x: Music) => x.id === id);
    if(index === -1) {
      return
    }

    ZNotification.success({
      title: "Success",
      description: "Add music to album successfully"
    })

    this.musicsAblum.push(this.musics[index]);
    this.musics.splice(index, 1);
  }

  async updateAlbum(name: string, description:string, avatar: any) {
    const data = new FormData();
    data.set('name', name);
    data.set('description', description);
    data.set('image', avatar as File);

    const arrAblum = [...this.musicsAblum].map((music: Music) => {
      return music.id;
    })

    data.set('musics', JSON.stringify(arrAblum));

    try {
      await new ApiClient().put(`admin/albums/${this.album.id}`, data);

      ZNotification.success({
          title: "Success",
          description: "Album update successfully"
      })

      this.$router.push('/dashboard/albums');
    } catch (error) {
      return error;
    }
  }

  async asyncData ({ params, $axios }: Context) {
    const [myAlbum, myComments, myMusics] = await Promise.all([
      new ApiClient($axios).get(`admin/albums/${params.id}`),
      new ApiClient($axios).get(`admin/comments?album_id=${params.id}`),
      new ApiClient($axios).get(`admin/musics`)
    ])

    myAlbum.data.created_at = myAlbum.data.created_at.split('T')[0].split('-').join('/');

    if(myAlbum.data.musics !== undefined) {
      myAlbum.data.musics.forEach((music: Music) => {
        const id = music.id;
        const index = myMusics.data.findIndex((m: Music) => {
          return m.id === id;
        })
        if(index !== -1){
          myMusics.data.splice(index, 1);
        }
      });

      myAlbum.data.musics.forEach( (music: Music) => {
        const x = music.created_at.split('T')[0].split('-').join('/');
        music.created_at = x;
      });
    }

    if(myComments.data !== undefined) {
      myComments.data.forEach((comment: Comment) => {
        const x = comment.created_at.split('T')[0].split('-').join('/');
        comment.created_at = x;
      });
    }

    myMusics.data.forEach((music: Music) => {
      const x = music.created_at.split('T')[0].split('-').join('/');
      music.created_at = x;
    });

    myMusics.data = myMusics.data.filter((music: Music) => music.state === 'active')

    return {
      album: myAlbum.data,
      comments: myComments.data,
      musicsAblum: myAlbum.data.musics,
      musics: myMusics.data
    }
  }
}
</script>

<style lang="less">
.tabs{
  &-item{
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    height: 100%;
    background-color: #fff;
    border: none;
  }

  &-item:hover {
    border-bottom: 2px solid black;
  }

  &-item-active {
    border-bottom: 2px solid black;
  }
}

.comments {
  .id {
    flex: 0 0 80px;
  } 

  .user_uid {
    flex: 0 0 200px;
  }
  
  .created_at {
    width: 200px;
  }
}

.album-musics{
  display: flex;
  .id {
    flex: 0 0 60px;
  }

  .name {
    flex: 1
  }

  .author {
    flex: 0 0 160px;
  }

  .state {
    flex: 0 0 80px;
  }
}

.col-6 {
  width: 50%;
}

.find{
  padding-left: 12px;
  min-width: 300px;
  height: 30px;
  border: 1px solid rgba(43, 43, 43, 0.2);
  border-radius: 3px;
  font-size: 14px;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #007bff;
  }

  &:focus {
    outline: none;
    border: 1px solid #007bff;
  }

  &-btn{
    cursor: pointer;
    width: 30px;
    height: 30px;
    color: #fff;
    background: #007bff;
    border: 1px solid #007bff;
    border-radius: 3px;
    font-size: 14px;
  }
}
</style>