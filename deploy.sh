#!/bin/bash
cd /home/ubuntu/Acrilc-Backend
git pull origin main
npm install
pm2 restart all