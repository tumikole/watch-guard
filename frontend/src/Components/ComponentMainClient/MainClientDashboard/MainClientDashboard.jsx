import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterClient from '../RegisterClient/RegisterClient';
import PaymentOptions from '../PaymentOptions/PaymentOptions';
import './MainClientDashboard'
import Navbar from '../Navbar/Navbar';

const MainClientDashboard = () => {

    return (

        <div className='MainClientDashboard'>
            <main class="MainClientDashboard-container">
                <div class="menu">
                    <div class="avatar">
                        <img
                            class="thumb"
                            src="https://png.pngtree.com/png-vector/20220509/ourmid/pngtree-company-logo-design-trademark-design-creative-logo-png-image_4569380.png"
                            width="60"
                        />
                        <br />

                        <span class="name">@Hill side</span>
                        <hr />
                        <span class="our-name">powerd by: Community Guard</span>

                    </div>
                    <nav class="primary">
                        <a href="#" class="menu-item active">
                            <span class="iconoir-report-columns"></span>
                            <span class="desc">Dashboard</span>
                        </a>
                       
                        <a href="#" class="menu-item">
                            <span class="iconoir-table"></span>
                            <span class="desc">Stats</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-bag"></span>
                            <span class="desc">Tenants</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-user"></span>
                            <span class="desc">News</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-google-docs"></span>
                            <span class="desc">Reports</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-google-docs"></span>
                            <span class="desc">Community</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-leaderboard"></span>
                            <span class="desc">Payment history</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-settings"></span>
                            <span class="desc">Settings</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-settings"></span>
                            <span class="desc">Map</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-settings"></span>
                            <span class="desc">Events</span>
                        </a>
                        <a href="#" class="menu-item">
                            <span class="iconoir-google-docs"></span>
                            <span class="desc">Support</span>
                        </a>
                    </nav>
                    <span class="expander iconoir-arrow-right"></span>
                </div>
                <div class="topbar">
                    <h1 class="current">Client - Dashboard</h1>
                    <span class="search">
                        <label><span class="iconoir-search"></span></label>
                        <input class="bar" type="text" placeholder="Search..." />
                    </span>
                    <div>
                        <button className='btn btn-success'>
                            Add users
                        </button>
                    </div>
                </div>
                <div class="dashboard">
                    <div class="cardcolumn">
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                    </div>
                    <div class="cardcolumn">
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                    </div>
                    <div class="cardcolumn">
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                        <div class="card">
                            <header>
                                <a class="title" href="#"></a>
                                <span class="iconoir-more-vert"></span>
                            </header>
                            <div class="content"></div>
                            <div class="meta">
                                <span class="iconoir-pin"></span>
                                <span class="iconoir-eye-off"></span>
                                <span class="iconoir-share-ios"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="side">
                    <div class="card weather">
                        <img
                            class="condition"
                            src="https://user-images.githubusercontent.com/30212452/203724734-5f748507-7ae4-49f9-89f8-7fce3112cd95.png"
                        />
                        <div class="content"></div>
                        <div class="meta">
                            <span class="location">
                                <span class="iconoir-pin-alt"></span>
                                Athens, GR
                            </span>
                            <div class="datetime">
                                <span class="iconoir-calendar"></span>
                                <span class="date">21 July, 2022</span>
                                <span class="time">5:01</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <header>Schedule</header>
                        <div class="content">
                            <ul>
                                <li>(15:30) Deliver the project to client</li>
                                <li>(18:00) Meet Mike @ White Goose</li>
                                <li>(19:30) Dinner with Mary @ Kit-Bar</li>
                                <li>(22:00) Watch the Falcons match</li>
                                <li>(23:30) Headspace Meditate</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <div class="video">
                <video
                    src="https://user-images.githubusercontent.com/30212452/203724691-9e93bf50-df02-4034-9743-dfe32d18bf58.mp4"
                    muted
                    playsinline
                    autoplay
                    loop
                ></video>
            </div>
        </div>
    );
};

export default MainClientDashboard;
