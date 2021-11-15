<template>
    <div class="container">
        <nav class="menu">
            <h2 class="menu-icon">
                <i class="fas fa-chart-line"></i>
                NuxtJS
            </h2>
            <ul class="menu-list">
                <li :class="['item', {'item-selected': selectedItems[0]}]">
                    <a href="">
                        <i class="fas fa-home"></i>
                        Dashboard
                    </a> 
                </li>
                <li :class="['item', {'item-selected': selectedItems[1]}]">
                    <a href="">
                        <i class="fas fa-user"></i>
                        User
                    </a>
                    
                </li>
                <li :class="['item', {'item-selected': selectedItems[2]}]">
                    <a href="">
                        <i class="fas fa-music"></i>
                        Music
                    </a>
                </li>
                <li :class="['item', {'item-selected': selectedItems[3]}]">
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
            <header class="header">
                <div class="form-search">
                    <input class="form-control" type="text" placeholder="Search..."><button class="btn">Search</button>
                </div>

                <div class="account">
                    <figure class="avatar">
                        <img src="" alt="">
                    </figure>

                    <div class="text">
                        <p class="name">Hà đẹp trai</p>
                        <p class="nickname">Đại gia ngầm</p>
                    </div>
                </div>
            </header>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LayoutAdmin extends Vue{
    selectedItems = [false, false, false, false];
}
</script>

<style lang="less">
*{
    padding: 0;
    margin: 0; 
    box-sizing: border-box;
}

html{
    background-color: rgb(238,243,246);
}

.container{
    font-family: Arial, Helvetica, sans-serif;
    .menu {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 16.6666667%;
        background-color: rgb(50,58,71);
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
                padding: 16px;
                text-decoration: none;
                color: rgb(119, 131, 147);
            }

            .item-selected a{
                color: white;
            }

            .item a:hover{
                color: white;
            }
        }
    }

    .content{
        float: right;
        width: 83.3333333%;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            height: 50px;
            background-color: white;

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
                    background-color: rgb(115, 125,240);
                    border: 1px solid rgb(108,118, 216);
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
                    width: 35px;
                    height: 35px;
                    background-color: gray;
                    border-radius: 50%;
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
    }
}
</style>