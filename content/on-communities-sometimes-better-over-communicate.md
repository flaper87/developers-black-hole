Title: On communities: Sometimes it's better to over-communicate
Date: 2016-10-17
Author: Flavio Percoco
Tags: openstack,python,communities,open-source
Slug: on-communities-sometimes-better-over-communicate

Communities, regardless of their size, rely mainly on the communication there is
between their members to operate. The existing processes, the current
discussions, and the future growth depend heavily on how well the communication
throughout the community has been established. The channels used for these
conversations play a critical role in the health of the communication (and the
community) as well.

The things that are communicated are, of course, important. They are the objects
being sent among the peers in the community. These things are the messages
traveling throughout the system and they must respect a protocol, like every
message in every other protocol. Failing to respect this protocol will result in
a non-effective communication. Failed communications have side-effects on the system.

A community is a live ecosystem and as such it relies on communications to
inform other peers of the system about the current status, evolution, changes,
etc. These communications (or channels therefor) cannot guarantee awareness. Let
us leave delivery guarantees aside for the sake of the argument being made.
Awareness comes after delivery and delivery does not guarantee awareness. A
message could have been delivered to other members of the ecosystem but it does
not mean the message was processed, therefore the peer may be neither aware of
the message nor of the message content even after the message was delivered.

Think of emails, blogs, or any other asynchronous way of communication. None of
these channels can guarantee the peers that have received the message have
actually read it. This is not under the sender's control. There's a large number
of elements that may affect the communication. If you take mailing lists, for
example, it may very well be that the receiver of the message is getting too
many emails and therefore is subject to missing some of them. This is just one,
realistic, example of what could happen. The number of cases that can cause lack
of awareness is bigger than what I've mentioned so far but it's not worth
exploring it any further.

The way some systems cope with the lack of the above guarantees is by
propagating the same message several times - perhaps through different
channels - with the same expectations (or lack thereof). Over-communicating
won't solve the issue of peers not being aware of the message. This won't get
rid of surprises. It does, however, increases the probabilities of the message
being processed.

The use of multiple channels will provide different ways for consumers of this
message to process it. Communities, specifically, are built by individual peers
from different environments and cultures. These peers have different preferences
and they may consume messages from different sources. It is indeed impossible to
cover all the options and to satisfy every preference. Selecting the right set
of channels for these communications and propagating the messages through
multiple of these channels when necessary is the key to increase the probability
for the messages to be consumed.

Over-communicating does not imply spamming consumers, it does not imply sending
the same message, multiple times, through the same channel either.
Over-communicating, in the context of communities, requires using different
channels to reach different sets of peers. These sets may overlap, nonetheless.

Surprise (sometimes) doesn't mean there's lack of communication or transparency.
It's important, however, to reflect on whether the communication channels and
methodologies being used are the right ones - or simply enough - for reducing
the lack of awareness.

If you liked this post, you may be interested in the keynote I gave at
[Pycon South Africa](https://za.pycon.org/).
[Keeping up with the pace of a fast growing community without dying](https://www.youtube.com/watch?v=bW_AEmKbB_o)
