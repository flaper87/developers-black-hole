Title: Embracing new languages in OpenStack
Date: 2016-11-07
Author: Flavio Percoco
Tags: openstack,python,go,open-source
Slug: embracing-other-languages-openstack

OpenStack has been an (almost) Python-only community for a very long time. Other
programming languages have been used for very specific use cases - UI,
configuration files, deployment tools, for example - but never for OpenStack's
API services until now.

During the Newton cycle, a resolution to
[accept Go as an official programming language](https://review.openstack.org/#/c/312267/)
for OpenStack was brought up to the OpenStack's Technical Committee for
evaluation. The topic was discussed on several meetings, mailing list threads
and on the resolution itself. I won't get into the details of the discussion and
how it evolved but I do want to provide some details about the decision, which
will be useful for the rest of the post.

The decision was to reject Go as an official language for the time being and be
open to re-evaluate a proposal like this again in the future. I believe the
reasons behind this rejection can be summarized as follow:

1. Some members of the TC were concerned about the impact adding a new language
   would have had in the community. Would accepting the language split the
   community? Would this create new silos? Would accepting the language raise
   the bar for new members (experienced and not)?
  
2. Some members of the TC were concerned about the lack of information,
   research, and work on known common areas that exist today in the community.
   How would the Go code be shared across the community? Would there be a
   *goslo* project (thanks Thierry for the name)? What about authentication?
   What about the messaging layer? How to produce releases? How to maintain
   stable branches?
  
3. The team requesting this change has a history of not working on cross-project
   tasks beyond their project and this raised the concerns above and made some
   members of the committee skeptical about this being successful for the entire
   community.


What would it take to accept a new language?
============================================

I want to make it clear that I'm not speaking for any members of the TC and that
this is a personal opinion and a way to communicate better what the expectations
on this topic are, at least to me. I'll let members of the entire community
(dis)agree with me on their own.

During the discussions I was strong on my concerns about #1, mostly because I
believe the migration to the "Big Tent" is still not complete. I don't really
know what will be the thing that would make us consider the migration as
completed but, I can tell for sure that as a community we're hitting some
problems that ought to be addressed before we can make any other major change to
our policies.

Back to the post. I've become more and more obsessed with setting expectations
straight for many things, especially for requests like this which aim to make
changes to processes and policies that exist already. By having the expectations
laid out, it becomes easier for the people involved to know the direction they
need to head towards, and it defines the challenge to make the change happen.

I believe working on #2 would ease my worries around #1. It'd show a stronger
commitment for the teams/people involved in this change and it'll help building
the initial knowledge base that eventually will be used by other members of the
community. I know working on #2 might seem getting a bit ahead of ourselves but
it's not. By working out basic things like how the common code will be shared,
how the code will be tested, how the code will be shipped, the authentication
library, etc we will be setting the bases for the actual work that needs (or
will) happen in the future. It's like pretending to run a CI jobs without
defining the workflow, OS, etc first.

Anyway, what are these "basic things" that I mentioned above? I'll try to
summarize them in the non-exhaustive list below:

Define a way to share code/libraries for projects using the language
--------------------------------------------------------------------

The [Oslo Team](http://governance.openstack.org/reference/projects/oslo.html) is
responsible for maintaining the common libraries used across the OpenStack
community. This set of libraries includes the messaging library
(oslo.messaging), the i18n library (oslo.i18n), the DB layer library (oslo.db)
among other critical libraries.

These libraries don't exist to keep the Oslo team busy. They exist because they
collect common code that used to be duplicated across many projects in the
community. This code has now been removed, stabilized and release by the Oslo
team.

I believe that we, as a community, learned the hard way that this is an
inevitable thing. As soon as more projects using the same language will start
popping up, the need for sharable code will inevitably come. Therefore, I
believe it'd be better for us to define (technically and theoretically) how the
code , for any new language willing to be adopted in the community to be
accepted, will be shared before it's even accepted.

The above includes defining the team (or initial set of people) that will take
care of it is, how the deliverables of this team will be shipped, how they will
be tested and how they will be consumed.

I know doing this work ahead of time doesn't mean there won't be work in the
future and that everything will be flowers and ponies. I know there are many
unpredictable and changing things in our industry. I believe this work will
cover most of the initial work, nonetheless.

Work on a basic set of libraries for OpenStack base services
------------------------------------------------------------

This may seem like a quite high bar to set. While figuring out how code will be
shared may seem already like a difficult enough requirement, I believe it's
still doesn't cover the minimum for OpenStack services.

OpenStack services that are integrated in the ecosystem require at least one of
the following libraries:

- keystoneauth / keystone-client
- oslo.config
- oslo.db
- oslo.messaging

Working on a database or messaging abstraction library without consuming it is
likely going to provide the wrong abstraction, resulting in a poor API. The
authentication layer, on the other hand, is something that pretty much every
OpenStack service needs and it shouldn't be such a hard thing to work on, which
is not to say it's an easy task.

By working on any of these libraries, it'll be possible to test the CI jobs that
will be used for the new language to make sure the bases for new projects are
set correctly.

Define how the deliverables are distributed
-------------------------------------------

OpenStack's release process is almost entirely automated. Most of the processes
that involve releasing the various deliverables produced by the community are
automated and managed by the release team. At the end of the process, tarballs
are generated for each deliverable.

As far as Python goes (and the rest of the languages currently supported in
OpenStack) generating these tarballs is simple as they just contain the source
code. For compiled languages, like Go, it's critical to define what will be
shipped as part of these tarballs. Will the tarball contain a binary? Will the
tarball contain the source code? If the answer is that it'll contain a binary,
should the release team be worried about having 2 different types of tarballs
(one containing source files and the other binaries)?

Define how stable maintenance will work
---------------------------------------

Stable branches are often forgotten in our community and the work that is put in
maintaining these branches often goes thankless. Stable branches, however, run
many of the cloud providers that use OpenStack today and they are critical for
backporting fixes that are backwards compatible.

Each language has its own way to ship libraries, manage compatibility, express
stability, etc. When adding a new language to the community, it's critical to
work with the rest of the teams that have a horizontal impact so they can ramp
up and become familiar with the new language methodologies.

The team proposing the new language should work with the stable maintenance team
and help defining the guidelines that should be followed for the new language.
Some of the guidelines have been written down in the
[stable branches section](http://docs.openstack.org/project-team-guide/stable-branches.html)
of the project guide team.

Setup the CI pipelines for the new language
-------------------------------------------

Last but not least in my list of minimum requirements for adding a new language
there's working with the infrastructure team to setup the CI pipelines that will
eventually be used for testing code written with the new language.

This task is probably at the bases of the work required here. In order to
address any of the previous tasks, it'll be necessary to setup CI jobs, which
involves coordinating with the Infrastructure team. The latter is critical. The
involvement of the Infrastructure team is crucial for adding any new language
and their feedback will play an important role in any decision.

If we take a look at the list of jobs we've setup for Python, there are some
common jobs that most of the projects (service and libraries) have in common.
I'd expect the team working on adding a new language to also setup jobs for
common things that are used across different projects.

Here's a (non-exhaustive) list that attempts to collect some of this common jobs:

- Lint checkers
- Doc builders
- Release Pipelines 

That looks like a lot to do
===========================

Going through the above mentioned tasks takes quite some time and it requires
people. I'm aware of that. Unfortunately, each of the teams that would be
involved in this process don't really have spare hands to work on many other
things, which is why I believe most of the effort for adding a new language must
come from the group of people interested in the language. This effort will
require time from each of these teams anyway, even if most of the researches,
documentations and patches are driven by the interested team.

It took the entire community several years to get to the point it is now with
Python. I do not expect the team working on adding a new language to do in one
week what's been accomplished in 6 years for Python. However, I do not expect
this to take as long. The processes have been established, the teams exist
already and by working together it'll be possible to address the above points in
reasonable time.

I would expect this to be a multi-cycle work, which is why I'd be very skeptical
on adding new languages without the above being addressed first. People come and
go and even if commitment is promised, I think the best way to guarantee the
work is by doing it first and then accepting the language.

Finally, even in the presence of a well-formed process for adding new languages,
I'd recommend projects to prefer Python over other languages. This has nothing
to do with language preference but the shared knowledge that today exists in our
community. I believe this knowledge is invaluable. Changing this knowledge to a
new language would take may years whereas making it better is an easier task.

Innovation is important for many projects. We have to accept that things won't
stay the same forever, languages change, projects evolve, some projects die.
This is part of the evolution of our community and I'd like the OpenStack
community to embrace innovation the best way possible. I'd like us to do it in a
more conservative way, though. I believe the tasks in this post would help
adding new languages safely-enough and yet fast-enough.

This is, of course, a personal view of things. As I mentioned, I've become more
and more obsessed with making expectations clear. Therefore, I'll work on a
official document that I can submit to the Technical Committee for review and,
hopefully, approval.
