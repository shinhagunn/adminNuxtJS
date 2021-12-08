<template>
  <LayoutAdmin :selected="selected" :pageName="pageName">
    <div class="main">
      <Block class="pb-none">
        <div class="tabs">
          <button :class="['tabs-item', {'tabs-item-active': (tabNumber === 1)}]" @click="handleChangeTabs(1)">User details</button>
          <button :class="['tabs-item', {'tabs-item-active': (tabNumber === 2)}]" @click="handleChangeTabs(2)">Musics liked</button>
          <button :class="['tabs-item', {'tabs-item-active': (tabNumber === 3)}]" @click="handleChangeTabs(3)">Albums liked</button>
          <button :class="['tabs-item', {'tabs-item-active': (tabNumber === 4)}]" @click="handleChangeTabs(4)">Update password</button>
        </div>
      </Block>
      
      <Block> 
        <UserDetail v-if="tabNumber === 1" :user="user"/>
        <Table
          v-if="tabNumber === 2"
          :data="musicsLiked"
          :columns="columns1"
          :is-router-link="true"
          :router-builder="'/musics/#{id}'"
        />
        <Table
          v-if="tabNumber === 3"
          :data="albumsLiked"
          :columns="columns2"
          :is-router-link="true"
          :router-builder="'/albums/#{id}'"
        />
        <div v-if="tabNumber === 4" class="pass-container">
          <div class="update-password">
            <span class="title">Update Password</span>
            <input v-model="password" class="music-item input-change" type="password">
            <button @click="updateUser">Update</button>
          </div>
        </div>
      </Block>

      <Block v-if="tabNumber === 1" class="users" block-name="User Musics">
        <Table
          :data="musics"
          :columns="columns1"
          :is-router-link="true"
          :router-builder="'/musics/#{id}'"
        />
        
      </Block>

      <Block v-if="tabNumber === 1" class="users" block-name="User Albums">
        <Table
          :data="albums"
          :columns="columns2"
          :is-router-link="true"
          :router-builder="'/albums/#{id}'"
        />
      </Block>
    </div>
  </LayoutAdmin>
</template>

<script lang='ts'>
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator'
import ZNotification from "@/library/z-notification"
import ApiClient from '~/library/ApiClient';
import { Album, Align, Column, Music } from '~/types';

@Component({
  middleware: ['check', 'notLogged'],
})
export default class Uid extends Vue {
  head() {
    return {
      title: 'User Detail',
    }
  }

  selected = 2
  pageName = 'User Detail'
  password = '';
  user: any = null;
  musics: any = null;
  musicsLiked: any = null;
  albumsLiked: any = null;
  albums: any = null;
  tabNumber = 1;

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
      key: 'created_at',
      title: 'Created at',
      align: Align.Right
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
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'view_count',
      title: 'View count',
      align: Align.Center,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Right,
    }
]

  async updateUser() {
    if(this.password.length === 0) {
      return 
    }
    
    const data = new FormData();
    data.set('first_name', this.user.first_name);
    data.set('last_name', this.user.last_name);
    data.set('state', this.user.state);
    data.set('role', this.user.role);
    data.set('bio', this.user.bio);
    data.set('password', this.password);

    try {
      await new ApiClient().put(`admin/users/${this.user.uid}`, data);
      ZNotification.success({
          title: "Success",
          description: "Password update successfully"
      })
      this.$router.push('/users');
    } catch (error) {
      return error;
    }
  }

  async asyncData ({ params, $axios }: Context) {
    const [myUser, myMusic, musicsLiked, myAlbums, albumsLiked] = await Promise.all([
      new ApiClient($axios).get(`admin/users/${params.uid}`),
      new ApiClient($axios).get(`admin/musics?uid=${params.uid}`),
      new ApiClient($axios).get(`public/users/${params.uid}/liked/musics`),
      new ApiClient($axios).get(`admin/albums?uid=${params.uid}`),
      new ApiClient($axios).get(`public/users/${params.uid}/liked/albums`),
    ])

    myMusic.data.forEach( (music: Music) => {
      const x = music.created_at.split('T')[0].split('-').join('/');
      music.created_at = x;
    }); 

    musicsLiked.data.forEach( (music: Music) => {
      const x = music.created_at.split('T')[0].split('-').join('/');
      music.created_at = x;
    });

    myAlbums.data.forEach( (album: Album) => {
      const x = album.created_at.split('T')[0].split('-').join('/');
      album.created_at = x;
    });

    albumsLiked.data.forEach( (album: Album) => {
      const x = album.created_at.split('T')[0].split('-').join('/');
      album.created_at = x;
    });
    
    return {
      user: myUser.data,
      musics: myMusic.data,
      musicsLiked: musicsLiked.data,
      albums: myAlbums.data,
      albumsLiked: albumsLiked.data
    }
  }

  formatDateData(data:string) {
    return data.split('T')[0].split('-').reverse().join('/');
  }

  handleChangeTabs(number:number){
    this.tabNumber = number;
  }
}
</script>

<style lang="less">
.tabs{
  &-item {
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    padding-bottom: 8px;
    height: 100%;
    background-color: #fff;
    border: none;

    &:hover {
      border-bottom: 2px solid black;
    }
  }


  &-item-active {
    border-bottom: 2px solid black;
  }
}

.pass-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;

  .title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 500;
  }

  input, button {
    margin-bottom: 16px;
    width: 100%;
    height: 30px;
  }

  input {
    padding-left: 12px;
    border: 1px solid rgba(43, 43, 43, 0.2);
    border-radius: 3px;
    transition: all 0.3s;

    &:hover {
      border: 1px solid #007bff;
    }

    &:focus {
      outline: none;
      border: 1px solid #007bff;
    }
  }

  button {
    cursor: pointer;
    border-radius: 3px;
    background-color: #007bff;
    border: 1px solid #007bff;
    color: #fff;
  }
}

.users {
  .user_uid {
    flex: 0 0 200px;
  }

  .state {
    flex: 0 0  150px;
  }

  .role {
    flex: 0 0  150px;
  }

  .view_count {
    flex: 0 0 150px;
  }

  .created_at {
    flex: 0 0 150px;
  }
}
</style>