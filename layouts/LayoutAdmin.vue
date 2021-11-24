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
                    <a href="">
                        <i class="fas fa-music"></i>
                        Musics
                    </a>
                </li>
                <li :class="['item', {'item-selected': (selected == 4)}]">
                    <a href="">
                        <i class="fas fa-chart-line"></i>
                        Statistic
                    </a>
                </li>
                <li class="item">
                    <nuxt-link to="/">
                        <i class="fas fa-undo-alt"></i>
                        Back to website
                    </nuxt-link>
                </li>
            </ul>
        </nav>

        <div class="content">
            <header class="header-top">
                <div class="form-search">
                    <input class="form-control" type="text" placeholder="Search..."><button class="btn">Search</button>
                </div>

                <div class="account">
                    <figure class="avatar">
                        <img :src="'http://localhost:3000/api/v2/public/users/' + user.id + '/avatar'" alt="">
                    </figure>

                    <div class="text">
                        <p class="name">{{ user.name }}</p>
                        <p class="nickname">{{ user.role }}</p>
                    </div>
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
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'

interface breadcrumb {
    url: string;
    name: string;
}

@Component({})
export default class LayoutAdmin extends Vue{
    @Prop() readonly selected!: number;
    @Prop() readonly pageName!: string;

    menuLogoes:string[] = [ '', 'fas fa-home', 'fas fa-user', 'fas fa-music', 'fas fa-chart-line'];
    logoNow = this.menuLogoes[this.selected];

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
                    name: 'Home / ',
                    url: tam[i]
                }
            }
        }
        return result;
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
            justify-content: space-between;
            align-items: center;
            padding: 0 34px;
            height: 73px;
            background-color: white;
            box-shadow: 0 0 5px 0 rgba(43, 43, 43, 0.1);


            .form-search{
                .form-control{
                    display: inline-block;
                    padding-left: 16px;
                    width: 250px;
                    height: 30px;
                    background-color: rgb(240, 243, 250);
                    border: none;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }

                .form-control:focus{
                    outline: none;
                }

                .btn{
                    cursor: pointer;
                    display: inline-block;
                    width: 65px;
                    height: 30px;
                    background-color: #007bff;
                    border: 1px solid #007bff;
                    color: #fff;
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                }
            }

            .account{
                display: flex;
                padding: 0 16px;
                align-items: center;
                border-left: 1px solid gray;

                .avatar{
                    width: 38px;
                    height: 38px;
                    background-color: gray;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .text{
                    padding-left: 8px;

                    .name{
                        font-size: 15px;
                    }

                    .nickname{
                        font-size: 11px;
                    }
                }
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