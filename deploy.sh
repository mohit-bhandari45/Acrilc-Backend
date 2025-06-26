#!/bin/bash
cd /home/ubuntu/your-repo
git pull origin main
npm install
pm2 restart all