Title: Deploy MariaDB, Keystone and Glance with TripleO on Kubernetes
Date: 2017-09-18
Author: Flavio Percoco
Tags: tripleo,undercloud,openstack
Slug: glance-keystone-mariadb-on-k8s-with-tripleo

I recently
[posted a small screencast](http://blog.flaper87.com/deploy-mariadb-kubernetes-tripleo.html)
showing part of the progress I've made on the research to deploy OpenStack
services on Kubernetes using TripleO.

In this new screencast, I would like to demo a small deployment of Keystone,
Glance, and mariadb using the TripleO undercloud deploy command.

What's really new in this screencast is the ability for the APBs being used to
bootstrap the services. These new roles create the databases, run the initial
migrations and register the endpoints in keystone. Here's the video:

**NOTE:** Sorry for the small font

{% youtube MlgXGiVVXT4 %}

What if I want to play with it?
===============================

Here's a small recap of what's needed to play with this PoC. Before you do,
though, bear in mind that this work is in its very early days and that there are
*many* things that don't work or that could be better. As usual, any kind of
feedback and/or contribution are welcome. Note that some of the steps below
require root access

1# Clone the tripleo-apbs repository and its submodules:

    git clone --recursive https://github.com/tripleo-apb/tripleo-apbs

2# Build the images you want to run:

    ./build.sh mariadb

     ./build.sh glance

     ./build.sh keystone


3# Clone the `undercloud_containers` repo and run the `doit.sh` script. This
repo is meant to be used only for development purposes:

    git clone https://github.com/flaper87/undercloud_containers


4# Prepare the environment

     cd undercloud_containers && ./doit.sh

5# Deploy the undercloud (as root)

    cd $HOME && ./run.sh

The `doit.sh` scripts uses my fork of tripleo-heat-templates, which contains the
changes to use the APBs. It's important to highlight that this fork doesn't
introduce changes to the existing API. You can see the comparison between the
fork and the main tripleo-heat-template's repo
[here](https://github.com/openstack/tripleo-heat-templates/compare/master...flaper87:tht-apbs)

Any feedback is welcomed! Remember this is a PoC and there's just 1 guarantee:
It may fail ;)
