Title: Deploy mariadb on kubernetes with TripleO
Date: 2017-08-07
Author: Flavio Percoco
Tags: tripleo,undercloud,oopenstack
Slug: deploy-mariadb-kubernetes-tripleo

I've spent quite some time researching how we can migrate TripleO from deploying
OpenStack on baremetal to Kubernetes. This work has been going on for around a
year already and it started with a migration from baremetal to Docker. Now that
this first migration is almost done, I've moved to research how we can do the
final migration to Kubernetes.

As in most of our works, we're striving the least possible, backwards
compatible, changes. To do this, I've focused on 3 main areas for now:

* **Unified configuration management**: Migrate out of puppet for configuration
  management and adopt a solution that can be shared across different projects
  in OpenStack.

* **Re-use of existing data**: Don't require greenfield deployments but be able
  to consume the existing data - hiera files, basically.

* **Re-use existing templates and libraries**: Avoid rewriting all the templates
  that have been written already for the first, docker based, migration. There
  are libraries, CLI tools, and API's that were developed for the first phase
  that can be re-used in the second one to reduce the amount of work needed.

I'm not planning to go into great detail in this post on what has been done in
each area - I'll do that in future posts - but rather show a small screencast
that features the TripleO undercloud command deploying mariadb on Kubernetes.

The code used in this screencast includes [ansible-role-l8s-mariadb](https://github.com/tripleo-apb/ansible-role-k8s-mariadb), and [ansible-role-l8s-tripleo](https://github.com/tripleo-apb/ansible-role-k8s-tripleo). The changes to tripleo-heat-template have not been published yet. I'll work on that and update this post (you can see the mysql.yaml file in the video, that's all you need to change).

{% youtube 1xFZZie2cWo %}
