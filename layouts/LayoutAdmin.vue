<template>
    <div class="container">
        <nav class="menu">
            <h2 class="menu-icon">
                <i class="fas fa-chart-line"></i>
                NuxtJS
            </h2>
            <ul class="menu-list">
                <li :class="['item', {'item-selected': (selected == 2)}]">
                    <nuxt-link to="/dashboard/users">
                        <i class="fas fa-user"></i>
                        Users
                    </nuxt-link>
                    
                </li>
                <li :class="['item', {'item-selected': (selected == 3)}]">
                    <nuxt-link to="/dashboard/musics">
                        <i class="fas fa-music"></i>
                        Musics
                    </nuxt-link>
                </li>
                <li :class="['item', {'item-selected': (selected == 4)}]">
                    <nuxt-link to="/dashboard/comments">
                        <i class="fas fa-comment"></i>
                        Comments
                    </nuxt-link>
                </li>
                <li :class="['item', {'item-selected': (selected == 5)}]">
                    <nuxt-link to="/dashboard/albums">
                        <i class="fas fa-compact-disc"></i>
                        Albums
                    </nuxt-link>
                </li>
            </ul>
            <button to="/" class="logout" @click="handleLogOut">
                <i class="fas fa-undo-alt"></i>
                Logout
            </button>
        </nav>

        <div class="content">
            <header class="header-top">
                <div v-if="drawer" class="filter" @click="onFilter">
                    <i class="fas fa-filter"></i>
                </div>
            </header>

            <div class="header-content">
                <div class="title">
                    <div class="icon">
                        <i :class="logoNow"></i>
                    </div>
                    <div class="page-name">
                        <h3>{{ pageName }}</h3>
                    </div>
                </div>

                <div class="breadcrumb">
                    <nuxt-link v-for="item in breadcrumb" :key="item.id" :to="'/' + item.url" class="bread-item"> {{ item.name }}</nuxt-link> 
                </div>
            </div>

            <slot></slot>
        </div>

        <Drawer v-if="drawer" :isFilter="isFilter" :filters="filters" @onFadeFilter="offFilter"/>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ZNotification from "@/library/z-notification"
import ApiClient from '~/library/ApiClient';
import { Filter } from '~/types';

interface breadcrumb {
    url: string;
    name: string;
}

@Component({})
export default class LayoutAdmin extends Vue{
    @Prop() readonly selected!: number;
    @Prop() readonly pageName!: string;
    @Prop() readonly filters!: Filter;
    @Prop() readonly drawer!: Boolean;

    menuLogoes:string[] = [ '', 'fas fa-home', 'fas fa-user', 'fas fa-music', 'fas fa-comment', 'fas fa-compact-disc' , 'fas fa-chart-line'];
    logoNow = this.menuLogoes[this.selected];
    isFilter = false;

    user = {
        id: this.$store.state.id,
        name: this.$store.state.last_name,
        role: this.$store.state.role
    }

    get breadcrumb () {
        const urlCurrent = this.$route.path;
        const result:breadcrumb[] = [];

        const tam = urlCurrent.split('/');
        tam.shift();

        let urlTotal = tam[0];

        for(let i = 0; i < tam.length; i++) {
            if (i === (tam.length - 1)) {
                const x = tam[i];
                tam[i] = urlTotal + '/' + tam[i];
                urlTotal = urlTotal + '/' + x;
                let y = x[0].toUpperCase();
                y += x.slice(1);

                result[i] = {
                    name: y,
                    url: tam[i]
                }
            } else if (i > 0) {
                const x = tam[i];
                tam[i] = urlTotal + '/' + tam[i];
                urlTotal = urlTotal + '/' + x;
                let y = x[0].toUpperCase();
                y += x.slice(1);

                result[i] = {
                    name: y + ' / ',
                    url: tam[i]
                }
            }else {
                result[i] = {
                    name: 'Dashboard / ',
                    url: tam[i]
                }
            }
        }
        return result;
    }


    onFilter() {
        this.isFilter = true;
    }

    offFilter() {
        this.isFilter = false;
    }

    async handleLogOut() {
        try {
            await new ApiClient().delete('identity/session');
            this.$store.commit('setId', null);
            this.$store.commit('setUid', null);
            this.$store.commit('setFirstname', null);
            this.$store.commit('setLastname', null);
            this.$store.commit('setState', null);
            this.$store.commit('setEmail', null);
            this.$store.commit('setRole', null);
            this.$store.commit('setBio', null);
            this.$store.commit('setCreatedAt', null);
            this.$store.commit('setUpdatedAt', null);
            this.$store.commit('setLogged', false);
            this.$store.commit('setReload', false);

            ZNotification.success({
                title: "Success",
                description: "Logout successfully"
            })

            this.$router.push('/dashboard/login');
        } catch (error) {
            return error;
        }
    }
}
</script>

<style lang="less">
*{
    padding: 0;
    margin: 0; 
    box-sizing: border-box;
}

html{
    background-color: #F2F7FB;
}

.container{
    font-family: Arial, Helvetica, sans-serif;
    .menu {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 15%;
        background-color: #263544;
        color: rgb(119, 131, 147);

        .menu-icon{
            padding: 24px;
            text-align: center;
            color: white;
        }

        .logout{
            cursor: pointer;
            display: inline-block;
            background-color: #263544;
            position: absolute;
            bottom: 16px;
            left: 16px;
            border: none;
            font-size: 16px;
            text-decoration: none;
            color: #b7c0cd;
        }

        .logout:hover{
            color: #fff;
        }

        .menu-list {
            list-style-type: none;

            .item a{
                display: block;
                padding: 14px 0 14px 32px;
                text-decoration: none;
                color: #b7c0cd;
            }

            .item-selected a{
                background-color: #1D2531;
                border-left: 3px solid #007bff;
            }

            .item a:hover{
                color: white;
            }
        }
    }

    .content{
        float: right;
        width: 85%;
        .header-top{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 34px;
            height: 73px;
            background-color: white;
            box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.15);

            .filter{
                font-size: 20px;
            }

            .filter:hover{
                color:#007bff;
                cursor: pointer;
            }
        }

        .header-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 34px 34px;

            .title{
                display: flex;
                align-items: center;
                
                .icon{
                    margin-right: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    font-size: 18px;
                    background-color: #4099ff;
                    color: white;
                    border-radius: 6px;
                    box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1);
                }

                .page-name h3{
                    font-weight: normal;
                    font-size: 18px;
                }
            }

            .breadcrumb{
                padding-right: 16px;
                .bread-item{
                    font-size: 14px;
                    text-decoration: none;
                    color: #1D2531;
                }

                .bread-item:hover{
                    color: #4099ff;
                }
            }
        }
    }
}
</style>