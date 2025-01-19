export const technicalWritingGuidelines = `
...
--- Technical Writing One teaches you how to write clearer technical documentation ---

Target audience
You need at least a little writing proficiency in English, but you don't need to be a strong writer to take this course.

If you've never taken any technical writing training, this course is perfect for you. If you've taken technical writing training, this class provides an efficient refresher.

Learning objectives
This course teaches you the fundamentals of technical writing. After completing this class, you will know how to do the following:

Use terminology—including abbreviations and acronyms—consistently.
Recognize ambiguous pronouns.
Distinguish active voice from passive voice.
Convert passive voice sentences to active voice.
Identify three ways in which active voice is superior to passive voice.
Develop at least three strategies to make sentences clearer and more engaging.
Develop at least four strategies to shorten sentences.
Understand the difference between bulleted lists and numbered lists.
Create helpful lists.
Create effective lead sentences for paragraphs.
Focus each paragraph on a single topic.
State key points at the start of each document.
Identify your target audience.
Determine what your target audience already knows and what your target audience needs to learn.
Understand the curse of knowledge.
Identify and revise idioms.
State your document's scope (goals) and audience.
Break long topics into appropriate sections.
Use commas, parentheses, colons, em dashes, and semicolons properly.
Develop beginner competency in Markdown.
It takes years of focused practice to become a great engineer or a great technical writer. This course will improve your technical writing but will not instantly transform you into a great technical writer.
...

...
  Just enough grammar (optional)

  This unit provides just enough grammar to understand the remainder of the course. If you already know some grammar, move on to Words. Otherwise, read on.

For simplicity's sake, this unit takes a few shortcuts; grammatical topics are actually wildly more complicated than this unit suggests.

Grammarians don't all agree on the number or types of parts of speech. The following table focuses on the parts of speech relevant to this course:

Part of Speech	Definition	Example
Noun	A person, place, concept, or thing	Sam runs races.
Pronoun	A noun that replaces another noun (or larger structure)	Sam runs races. He likes to compete.
Adjective	A word or phrase that modifies a noun	Sam wears blue shoes.
Verb	An action word or phrase	Sam runs races.
Adverb	A word or phrase that modifies a verb, an adjective, or another adverb	Sam runs slowly.
Preposition	A word or phrase specifying the positional relationship of two nouns	Sam's sneakers are seldom on his shelf.
Conjunction	A word that connects two nouns or phrases	Sam's trophies and ribbons live only in his imagination.
Transition	A word or phrase that connects two sentences	Sam runs races weekly. However, he finishes races weakly.
Nouns
Nouns represent people, places, or things. Judy, Antarctica, and hammers are all nouns, but so are intangible concepts like robustness and perfection. In the following example passage, we've formatted the nouns in bold:

In the framework, an object must copy any underlying values that the object wants to change. The protocol buffers in the codebase are huge, so copying the protocol buffers is unacceptably expensive.

In programming, you might think of classes and variables as your program's nouns.

Exercise
Identify the six nouns in the following passage:

C enables programmers to control pointers and memory. Great power brings great responsibility.

 Click the icon to see the answer.
You can find the nouns in boldface:

C enables programmers to control pointers and memory. Great power brings great responsibility.
Now suppose the second sentence was the following:

Great control brings great responsibility.
Is "control" a verb or is it a noun?

In this context, "control" is a noun, even though "to control" in the first sentence is a verb. Many words in English serve as a noun in some contexts and a verb in others.

Pronouns
Pronouns are an indirection layer—pointers to or substitutions for other nouns or sentences. For example, consider the following two sentences:

Janet writes great code. She is a senior staff engineer.

In the preceding example, the first sentence establishes Janet as a noun. The second sentence replaces the noun Janet with the pronoun She.

In the following example, the pronoun This replaces an entire sentence:

Most applications aren't sufficiently tested. This is poor engineering.

Exercise
Identify the three pronouns in the following passage:

The cafeteria featured peanut butter and plum jam on rye toast. Employees found it awesome and wished they could eat this every day.

 Click the icon to see the answer.
The cafeteria featured peanut butter and plum jam on rye toast. Employees found it awesome and wished they could eat this every day.
Verbs
A verb is an action word or phrase. When you want to represent the relationship between two nouns (an actor and a target), the verb does the work. A verb identifies what the actor does to the target.

Each sentence must contain at least one verb. For example, each of the following sentences contain a single verb:

Sakai prefers pasta.
Rick likes the ocean.
Smurfs are blue.
Jess suffers from allergies.
Some sentences, such as the following, contain multiple verbs:

Nala suffers from allergies and sneezes constantly.
The program runs slowly but fails quickly.
Depending on the tense and the conjugation, a verb could consist of one word or multiple words. For example:

Tina was eating breakfast a few hours ago.
Tina is eating lunch right now.
Tina will eat dinner tonight at 7:00.
Exercise
Identify the verbs in the following passage:

Samantha is coding Operation Bullwinkle in C++. This project currently consumes over 80,000 lines of code. She previously used Python, but recently gravitated to C++. Samantha leads a team of four software engineers, which will grow to six software engineers next quarter.

 Click the icon to see the answer.
Samantha is coding Operation Bullwinkle in C++. This project currently consumes over 80,000 lines of code. She previously used Python, but recently gravitated to C++. Samantha leads a team of four software engineers, which will grow to six software engineers next quarter.
Adjectives and adverbs
Adjectives modify nouns. For example, in the following passage, notice how the adjectives modify the subsequent noun:

Tom likes red balloons. He prepares delicious food. He fixed eight bugs at work.
Most adverbs modify verbs. For example, notice how the adverb (efficiently) in the following sentence modifies the verb (fixes):

Jane efficiently fixes bugs.
Adverbs are not necessarily right next to their verb. For example, in the following sentence, the adverb (efficiently) is two words away from the verb (fixes):

Jane fixes bugs efficiently.
Adverbs can also modify adjectives or other adverbs.

Exercise
Identify the four adjectives in the following passage:

Engineering is a great career for a brilliant mind. I know a clever engineer who could excel at any intellectual task.

 Click the icon to see the answer.
Engineering is a great career for a brilliant mind. I know a clever engineer who could excel at any intellectual task.
Prepositions
Prepositions specify the relationship between two things. Some prepositions answer the question, "Where is this thing relative to that other thing?" For example:

The submenu lies under the menu.
The definition appears next to the term.
The print function falls within the main routine.
Other prepositions answer the question, "When is this event relative to that other event?" For example:

The program evaluates the addition operation before evaluating the subtraction operation.
The cron daemon executes the script every Tuesday at noon.
A few prepositions (for example, by and of) answer other kinds of questions about relationships. For example, the following sentence uses by to relate a book to its authors:

The C Programming Language by Kernighan and Richie remains popular.
Note: Some English words fall into multiple grammatical categories. For example, although under is usually a preposition, under can also serve as an adverb or adjective depending on context.
Exercise
Identify the two prepositions in the following passage:

Parameters may optionally appear within a URL, after the path.

 Click the icon to see the answer.
Parameters may optionally appear within a URL, after the path.
Conjunctions and transitions
Conjunctions connect phrases or nouns within a sentence; transitions connect sentences themselves.

The most important conjunctions are as follows:

And
But
Or
For example, in the following sentence, and connects "code" with "documentation," while but connects the first half of the sentence with the second.

Olivia writes great internal code and documentation but seldom works on open-source projects.

The most important transitions in technical writing are as follows:

However
Therefore
For example
For example, in the following passage, notice how the transitions connect and contextualize the sentences:

Juan is a wonderful coder. However, he rarely writes sufficient tests. For example, Juan coded a 5,000 line FFT package that contained only a single 10-line unit test.

Exercise
Fill in the most appropriate transition:

Barbara typically studies problems for a long time before writing the first line of code. _____________, she spontaneously coded a method the other day when she was suddenly inspired.

 Click the icon to see the answer.
The best transition for this situation is as follows:

However
...

...
  Words

  We researched documentation extensively, and it turns out that the best sentences in the world consist primarily of words.

Define new or unfamiliar terms
When writing or editing, learn to recognize terms that might be unfamiliar to some or all of your target audience. When you spot such a term, take one of the following two tactics:

If the term already exists, link to a good existing explanation. (Don't reinvent the wheel.)
If your document is introducing the term, define the term. If your document is introducing many terms, collect the definitions into a glossary.
Use terms consistently
If you change the name of a variable midway through a method, your code won’t compile. Similarly, if you rename a term in the middle of a document, your ideas won’t compile (in your users’ heads).

The moral: apply the same unambiguous word or term consistently throughout your document. Once you've named a component thingy, don't rename it thingamabob. For example, the following paragraph mistakenly renames Protocol Buffers to protobufs:

Protocol Buffers provide their own definition language. Blah, blah, blah. And that's why protobufs have won so many county fairs.

George Fairbanks, a Google software engineer, provides this excellent note about consistent naming:

When I encounter two words that seem to be synonyms, I wonder if the author is trying to signal a subtle distinction that I need to track down and understand.
Yes, technical writing is cruel and restrictive, but at least technical writing provides an excellent workaround. Namely, when introducing a long-winded concept name or product name, you may also specify a shortened version of that name. Then, you may use that shortened name throughout the document. For example, the following paragraph is fine:

Protocol Buffers (or protobufs for short) provide their own definition language. Blah, blah, blah. And that's why protobufs have won so many county fairs.

Use acronyms properly
On the initial use of an unfamiliar acronym within a document or a section, spell out the full term, and then put the acronym in parentheses. Put both the spelled-out version and the acronym in boldface. For example:

This document is for engineers who are new to the Telekinetic Tactile Network (TTN) or need to understand how to order TTN replacement parts through finger motions.

You may then use the acronym going forward, as in the following example:

If no cache entry exists, the Mixer calls the OttoGroup Server (OGS) to fetch Ottos for the request. The OGS is a repository that holds all servable Ottos. The OGS is organized in a logical tree structure, with a root node and two levels of leaf nodes. The OGS root forwards the request to the leaves and collects the responses.

Do not cycle back-and-forth between the acronym and the expanded version in the same document.

Use the acronym or the full term?
Sure, you can introduce and use acronyms properly, but should you use acronyms? Well, acronyms do reduce sentence size. For example, TTN is two words shorter than Telekinetic Tactile Network. However, acronyms are really just a layer of abstraction; readers must mentally expand recently learned acronyms to the full term. For example, readers convert TTN to Telekinetic Tactile Network in their heads, so the "shorter" acronym actually takes a little longer to process than the full term.

Heavily used acronyms develop their own identity. After a number of occurrences, readers generally stop expanding acronyms into the full term. Many web developers, for example, have forgotten what HTML expands to.

Here are the guidelines for acronyms:

Don't define acronyms that would only be used a few times.
Do define acronyms that meet both of the following criteria:
The acronym is significantly shorter than the full term.
The acronym appears many times in the document.
Exercise
Fix the following passage. Assume that this passage is the initial instance of the term MapReduce in the document and that MR is the best abbreviation.

Jeff Dean invented MapReduce in 1693, implementing the algorithm on a silicon-based computer fabricated from beach sand, wax-paper, a quill pen, and a toaster oven. This version of MR held several world performance records until 2014.

(Please note that the preceding passage is meant to be humorous, not factual.)

 Click the icon to see the answer.
You could take a few different approaches here. One approach is to associate the acronym MR with the full term and then use that acronym:
Jeff Dean invented MapReduce (MR) in... This version of MR held several...
Alternatively, you could decide that defining an acronym for such a short passage puts too much burden on readers, so you'll simply use the full term MapReduce every time:
Jeff Dean invented MapReduce in... This version of MapReduce held several...
Incidentally, a more thorough technical writer would also convert "beach sand, wax-paper, a quill pen, and a toaster oven" into a bulleted list. However, that's another story for another lesson.
Recognize ambiguous pronouns
Many pronouns point to a previously introduced noun. Such pronouns are analogous to pointers in programming. Like pointers in programming, pronouns tend to introduce errors. Using pronouns improperly causes the cognitive equivalent of a null pointer error in your readers’ heads. In many cases, you should simply avoid the pronoun and just reuse the noun. However, the utility of a pronoun sometimes outweighs its risk (as in this sentence).

Consider the following pronoun guidelines:

Only use a pronoun after you've introduced the noun; never use the pronoun before you've introduced the noun.
Place the pronoun as close as possible to the referring noun. In general, if more than five words separate your noun from your pronoun, consider repeating the noun instead of using the pronoun.
If you introduce a second noun between your noun and your pronoun, reuse your noun instead of using a pronoun.
It and they
The following pronouns cause the most confusion in technical documentation:

It
They, them, and their
For example, in the following sentence, does It refer to Python or to C++?

Python is interpreted, while C++ is compiled. It has an almost cult-like following.

As another example, what does their refer to in the following sentence?

Be careful when using Frambus or Carambola with HoobyScooby or BoiseFram because a bug in their core may cause accidental mass unfriending.

This and that
Consider two additional problem pronouns:

This
That
For example, in the following ambiguous sentence, This could refer to the user ID, to running the process, or to all of these:

Running the process configures permissions and generates a user ID. This lets users authenticate to the app.

To help readers, avoid using this or that in ways where it's not clear what they refer to. Use either of the following tactics to clarify ambiguous uses of this and that:

Replace this or that with the appropriate noun.
Place a noun immediately after this or that.
Substitute or add explicit terms as needed, as in the following rewrites of the example's second sentence:

This user ID lets users authenticate.

The process of configuring permissions lets users authenticate.

The combination of permissions and a user ID lets users authenticate.

Exercise
Identify all possible meanings for the ambiguous pronouns in each of the following passages:

Aparna and Phil share responsibilities with Maysam and Karan and they are next on call.

You may import Carambola data via your configuration file or dynamically at run time. This may be a security risk.

 Click the icon to see the answer.
The pronoun they could refer to any of the following:
Aparna and Phil
Maysam and Karan
Aparna, Phil, Maysam, and Karan
Any one of the individuals as a singular gender-neutral pronoun
The pronoun this could refer to any of the following:
Importing via the configuration file
Importing dynamically at run time
Both
...

...
  Active voice vs. passive voice 

  The vast majority of sentences in technical writing should be in active voice. This unit teaches you how to do the following:

Distinguish passive voice from active voice.
Convert passive voice to active voice because active voice is usually clearer.

Distinguish active voice from passive voice in simple sentences
In an active voice sentence, an actor acts on a target. That is, an active voice sentence follows this formula:

Active Voice Sentence = actor + verb + target

A passive voice sentence reverses the formula. That is, a passive voice sentence typically follows the following formula:

Passive Voice Sentence = target + verb + actor

Active voice example
For example, here’s a short, active voice sentence:

The cat sat on the mat.

Actor: The cat
Verb: sat
Target: the mat
Passive voice examples
By contrast, here's that same sentence in passive voice:

The mat was sat on by the cat.

Target: The mat
Passive verb: was sat
Actor: the cat
Some passive voice sentences omit an actor. For example:

The mat was sat on.

Actor: unknown
Passive verb: was sat
Target: the mat
Who or what sat on the mat? A cat? A dog? A T-Rex? Readers can only guess. Good sentences in technical documentation identify who is doing what to whom.

Recognize passive verbs
Passive verbs typically have the following formula:


passive verb = form of be + past participle verb
Although the preceding formula looks daunting, it is actually pretty simple:

A form of be in a passive verb is typically one of the following words:
is/are
was/were
A past participle verb is typically a plain verb plus the suffix ed. For example, the following are past participle verbs:
interpreted
generated
formed
Unfortunately, some past participle verbs are irregular; that is, the past participle form doesn't end with the suffix ed. For example:

sat
known
frozen
Putting the form of be and the past participle together yields passive verbs, such as the following:

was interpreted
is generated
was formed
is frozen
If the phrase contains an actor, a preposition ordinarily follows the passive verb. (That preposition is often a key clue to help you spot passive voice.) The following examples combine the passive verb and the preposition:

was interpreted as
is generated by
was formed by
is frozen by
Imperative verbs are typically active
It is easy to mistakenly classify sentences starting with an imperative verb as passive. An imperative verb is a command. Many items in numbered lists start with imperative verbs. For example, Open and Set in the following list are both imperative verbs:

Open the configuration file.
Set the Frombus variable to False.
Sentences that start with an imperative verb are typically in active voice, even though they don't explicitly mention an actor. Instead, sentences that start with an imperative verb imply an actor. The implied actor is you.

Exercise
Mark each of the following sentences as either Passive or Active:

MutableInput provides read-only access.
Read-only access is provided by MutableInput.
Performance was measured.
Python was invented by Guido van Rossum in the twentieth century.
David Korn discovered the KornShell quite by accident.
This information is used by the policy enforcement team.
Click the Submit button.
The orbit was calculated by Katherine Johnson.

 Click the icon to see the answer.
Active. MutableInput provides read-only access.
Passive. Read-only access is provided by MutableInput.
Passive. Performance was measured.
Passive. Python was invented by Guido van Rossum in the twentieth century.
Active. David Korn discovered the KornShell quite by accident.
Passive. This information is used by the policy enforcement team.
Active. Click the Submit button. (Click is an imperative verb.)
Passive. The orbit was calculated by Katherine Johnson.
Distinguish active voice from passive voice in more complex sentences
Many sentences contain multiple verbs, some of which are active and some of which are passive. For example, the following sentence contains two verbs, both of which are in passive voice:

A diagram of the following sentence: Code is interpreted by
          Python, but code is compiled by C++.  The first half of the sentence
          (Code is interpreted by Python) is in active voice, where a target
          (Code) is acted on (is interpreted) by the actor (Python).
          The second half of the sentence (code is compiled by C++) is also in
          passive voice, where the target (code) is acted on (is compiled)
          by the actor (C++).

 

Here is that same sentence, partially converted to active voice:

A diagram of the following sentence: Python interprets code,
          but code is compiled by C++.  The first half of the sentence
          (Python interprets code) is in active voice, where an actor
          (Python) acts on (interprets) a target (code). The second half
          of the sentence (code is compiled by C++) is in passive voice,
          where the target (code) is acted on (is compiled) by the
          actor (C++).

 

And here is that same sentence, now fully converted to active voice:

A diagram of the following sentence: Python interprets code,
          but C++ compiles code.  The first half of the sentence
          (Python interprets code) is in active voice, where an actor
          (Python) acts on (interprets) a target (code). The second half
          of the sentence (C++ compiles code) is also in active voice,
          where the actor (C++) acts on (compiles) the target (code).

 

Exercise
Each of the following sentences contains two verbs. Categorize each of the verbs in the following sentences as either active or passive. For example, if the first verb is active and the second is passive, write Active, Passive.

The QA team loves ice cream, but the writers prefer sorbet.
Performance metrics are required by the team, though I prefer wild guesses.
When software engineers attempt something new and innovative, a reward should be given.

  Click the icon to see the answer.
  Active, Active. The QA team loves ice cream, but the writers prefer sorbet.
Passive, Active. Performance metrics are required by the team, though I prefer wild guesses.
Active, Passive. When software engineers attempt something new and innovative, a reward should be given.

Prefer active voice to passive voice
Use the active voice most of the time. Use the passive voice sparingly. Active voice provides the following advantages:

Most readers mentally convert passive voice to active voice. Why subject your readers to extra processing time? By sticking to active voice, you enable readers to skip the preprocessor stage and go straight to compilation.
Passive voice obfuscates your ideas, turning sentences on their head. Passive voice reports action indirectly.
Some passive voice sentences omit an actor altogether, which forces the reader to guess the actor's identity.
Active voice is generally shorter than passive voice.
Be bold—be active.

Scientific research reports (optional material)
Passive voice runs rampant through certain scientific research reports. In those research reports, experimenters and their equipment often disappear, leading to passive sentences that start off as follows:

It has been suggested that...
Data was taken...
Statistics were calculated...
Results were evaluated.
Do we know who is doing what to whom? No. Does the passive voice somehow make the information more objective? No.

Many scientific journals have embraced active voice. We encourage the remainder to join the quest for clarity.

Exercise
Rewrite the following passive voice sentences as active voice. Only part of certain sentences are in passive voice; ensure that all parts end up as active voice:

The flags weren't parsed by the Mungifier.
A wrapper is generated by the Op registration process.
Only one experiment per layer is selected by the Frombus system.
Quality metrics are identified by asterisks; ampersands identify bad metrics.

 Click the icon to see the answer.
The Mungifier didn't parse the flags.
The Op registration process generates a wrapper.
The Frombus system selects only one experiment per layer.
Asterisks identify quality metrics; ampersands identify bad metrics.

...
Clear sentences

Comedy writers seek the funniest results, horror writers strive for the scariest, and technical writers aim for the clearest. In technical writing, clarity takes precedence over all other rules. This unit suggests a few ways to make your sentences beautifully clear.

Choose strong verbs
Many technical writers believe that the verb is the most important part of a sentence. Pick the right verb and the rest of the sentence will take care of itself. Unfortunately, some writers reuse only a small set of mild verbs, which is like serving your guests stale crackers and soggy lettuce every day. Picking the right verb takes a little more time but produces more satisfying results.

To engage and educate readers, choose precise, strong, specific verbs. Reduce imprecise, weak, or generic verbs, such as the following:

Forms of be: is, are, am, was, were, etc.
Occur
Happen
For example, consider how strengthening the weak verb in the following sentences ignites a more engaging sentence:

Weak Verb	Strong Verb
The exception occurs when dividing by zero.	Dividing by zero raises the exception.
This error message happens when...	The system generates this error message when...
We are very careful to ensure...	We carefully ensure...
Many writers rely on forms of be as if they were the only spices on the rack. Sprinkle in different verbs and watch your prose become more appetizing. That said, a form of be is sometimes the best choice of verb, so don't feel that you have to eliminate every form of be from your writing.

Note that generic verbs often signal other ailments, such as:

An imprecise or missing actor in a sentence
A passive voice sentence
Exercise
Clarify the following sentences by picking more specific verbs. Along the way, feel free to rearrange the sentences and to add, modify, or delete words:

When a variable declaration doesn't have a datatype, a compiler error happens.
Compiler errors occur when you leave off a semicolon at the end of a statement.
 Click the icon to see the answer.
A few possible answers:
When a variable declaration doesn't specify a datatype, the compiler generates an error message.
If you declare a variable but don't specify a datatype, the compiler generates an error message.
A few possible answers:
Compilers issue errors when you omit a semicolon at the end of a statement.
A missing semicolon at the end of a statement triggers compiler errors.
Reduce there is / there are
Sentences that start with There is or There are marry a generic noun to a generic verb. Generic weddings bore readers. Show true love for your readers by providing a real subject and a real verb.

In the best-case scenario, you may simply delete There is or There are (and possibly another word or two later in the sentence). For example, consider the following sentence:

There is a variable called met_trick that stores the current accuracy.

Removing There is replaces the generic subject with a better subject. For example, either of the following sentences is clearer than the original:

A variable named met_trick stores the current accuracy.

The met_trick variable stores the current accuracy.

You can sometimes repair a There is or There are sentence by moving the true subject and true verb from the end of the sentence to the beginning. For example, notice that the pronoun you appears towards the end of the following sentence:

There are two disturbing facts about Perl you should know.

Replacing There are with You strengthens the sentence:

You should know two disturbing facts about Perl.

In other situations, writers start sentences with There is or There are to avoid the hassle of creating true subjects or verbs. If no subject exists, consider creating one. For example, the following There is sentence does not identify the receiving entity:

There is no guarantee that the updates will be received in sequential order.

Replacing "There is" with a meaningful subject (such as clients) creates a clearer experience for the reader:

Clients might not receive the updates in sequential order.

Exercise
Clarify the following sentences by removing There is, and possibly rearranging, adding, modifying, or deleting other words:

There is a lot of overlap between X and Y.
There is no creator stack for the main thread.
There is a low-level, TensorFlow, Python interface to load a saved model.
There is a sharding function named distribute that assigns keys.
 Click the icon to see a possible answer.
X and Y overlap a lot.
The main thread does not provide a creator stack.
TensorFlow provides a low-level Python interface to load a saved model.
The distribute sharding function assigns keys.
Minimize certain adjectives and adverbs (optional)
Adjectives and adverbs perform amazingly well in fiction and poetry. Thanks to adjectives, plain old grass becomes prodigal and verdant, while lifeless hair transforms into something lustrous and exuberant. Adverbs push horses to run madly and freely and dogs to bark loudly and ferociously. Unfortunately, adjectives and adverbs sometimes make technical readers bark loudly and ferociously. That's because adjectives and adverbs tend to be too loosely defined and subjective for technical readers. Worse, adjectives and adverbs can make technical documentation sound dangerously like marketing material. For example, consider the following passage from a technical document:

Setting this flag makes the application run screamingly fast.

Granted, screamingly fast gets readers' attention but not necessarily in a good way. Feed your technical readers factual data instead of marketing speak. Refactor amorphous adverbs and adjectives into objective numerical information. For example:

Setting this flag makes the application run 225-250% faster.

Does the preceding change strip the sentence of some of its charm? Yes, a little, but the revamped sentence gains accuracy and credibility.

Note: Don't confuse educating your readers (technical writing) with publicizing or selling a product (marketing writing). When your readers expect education, provide education; don't intersperse publicity or sales material inside educational material.
...

...
Short sentences

Software engineers generally try to minimize the number of lines of code in an implementation for the following reasons:

Shorter code is typically easier for others to read.
Shorter code is typically easier to maintain than longer code.
Extra lines of code introduce additional points of failure.
In fact, the same rules apply to technical writing:

Shorter documentation reads faster than longer documentation.
Shorter documentation is typically easier to maintain than longer documentation.
Extra lines of documentation introduce additional points of failure.
Finding the shortest documentation implementation takes time but is ultimately worthwhile. Short sentences communicate more powerfully than long sentences, and short sentences are usually easier to understand than long sentences.

Focus each sentence on a single idea
Focus each sentence on a single idea, thought, or concept. Just as statements in a program execute a single task, sentences should execute a single idea. For example, the following very long sentence contains multiple thoughts:

The late 1950s was a key era for programming languages because IBM introduced Fortran in 1957 and John McCarthy introduced Lisp the following year, which gave programmers both an iterative way of solving problems and a recursive way.

Breaking the long sentence into a succession of single-idea sentences yields the following result:

The late 1950s was a key era for programming languages. IBM introduced Fortran in 1957. John McCarthy invented Lisp the following year. Consequently, by the late 1950s, programmers could solve problems iteratively or recursively.

Exercise
Convert the following overly long sentence to a series of shorter sentences. Don't revise too much; just end up with a few sentences instead of only one.

In bash, use the if, then, and fi statements to implement a simple conditional branching block in which the if statement evaluates an expression, the then statement introduces a block of statements to run when the if expression is true, and the fi statement marks the end of the conditional branching block.

 Click the icon to see the answer.
In bash, use an if, then, and fi statement to implement a simple conditional branching block. The if statement evaluates an expression. The then statement introduces a block of statements to run when the if expression is true. The fi statement marks the end of the conditional branching block. (The resulting paragraph remains unclear but is still much easier to read than the original sentence.)
Convert some long sentences to lists
Inside many long technical sentences is a list yearning to break free. For example, consider the following sentence:

To alter the usual flow of a loop, you may use either a break statement (which hops you out of the current loop) or a continue statement (which skips past the remainder of the current iteration of the current loop).

When you see the conjunction or in a long sentence, consider refactoring that sentence into a bulleted list. When you see an embedded list of items or tasks within a long sentence, consider refactoring that sentence into a bulleted or numbered list. For example, the preceding example contains the conjunction or, so let's convert that long sentence to the following bulleted list:

To alter the usual flow of a loop, call one of the following statements:

break, which hops you out of the current loop.
continue, which skips past the remainder of the current iteration of the current loop.
Exercise
Refactor the following sentences into something shorter and clearer. Make sure that your answer contains a list:

To get started with the Frambus app, you must first find the app at a suitable store, pay for it using a valid credit or debit card, download it, configure it by assigning a value for the Foo variable in the /etc/Frambus file, and then run it by saying the magic word twice.
KornShell was invented by David Korn in 1983, then a computer scientist at Bell Labs, as a superset of features, enhancements, and improvements over the Bourne Shell (which it was backwards compatible with), which was invented by Stephen Bourne in 1977 who was also a computer scientist at Bell Labs.
 Click the icon to see the answer.
Sentence 1
Take the following steps to get started with the Frambus app:

Find the app at a suitable store.
Pay for the app using a valid credit or debit card.
Download the app.
Configure the app by assigning a value for the Foo variable in the /etc/Frambus file.
Run the app by saying the magic word twice.
Sentence 2
The following two Bell Labs computer scientists invented popular shells:

Stephen Bourne invented the Bourne Shell in 1977.
David Korn invented the KornShell in 1983.
The KornShell is a backwards-compatible superset of the Bourne Shell, containing many improvements over the older shell.

Eliminate or reduce extraneous words
Many sentences contain filler—textual junk food that consumes space without nourishing the reader. For example, see if you can spot the unnecessary words in the following sentence:

An input value greater than 100 causes the triggering of logging.

Replacing causes the triggering of with the much shorter verb triggers yields a shorter sentence:

An input value greater than 100 triggers logging.

With practice, you'll spot the extra words and feel enormous happiness in removing or reducing them. For example, consider the following sentence:

This design document provides a detailed description of Project Frambus.

The phrase provides a detailed description of reduces to the verb describes (or the verb details), so the resulting sentence could become:

This design document describes Project Frambus.

The following table suggests replacements for a few common bloated phrases:

Wordy	Concise
at this point in time	now
determine the location of	find
is able to	can
Exercise
Shorten the following sentences without changing their meaning:

In spite of the fact that Arnold writes buggy code, he writes error-free documentation.
Changing the sentence from passive voice to active voice enhances the clarification of the key points.
Determine whether Rikona is able to write code in COBOL.
Frambus causes the production of bugs, which will be chronicled in logs by the LogGenerator method.
 Click the icon to see the answer.
Here are some possible solutions:

Although Arnold writes buggy code, he writes error-free documentation.
Alternative answer: Arnold writes buggy code. However, he writes error-free documentation.
Changing the sentence from passive voice to active voice clarifies the key points.
Determine whether Rikona can code in COBOL.
Frambus produces bugs, which the LogGenerator method logs.
Reduce subordinate clauses (optional)
A clause is an independent logical fragment of a sentence, which contains an actor and an action. Every sentence contains the following:

A main clause
Zero or more subordinate clauses
Subordinate clauses modify the idea in the main clause. As the name implies, subordinate clauses are less important than the main clause. For example, consider the following sentence:

Python is an interpreted programming language, which was invented in 1991.

Main clause: Python is an interpreted programming language
Subordinate clause: which was invented in 1991
You can usually identify subordinate clauses by the words that introduce them. The following list (by no means complete) shows common words that introduce subordinate clauses:

which
that
because
whose
until
unless
since
Some subordinate clauses begin with a comma and some don't. The highlighted subordinate clause in the following sentence, for example, begins with the word because and does not contain a comma:

I prefer to code in C++ because I like strong data typing.
When editing, scrutinize subordinate clauses. Keep the one sentence = one idea, single-responsibility principle in mind. Do the subordinate clauses in a sentence extend the single idea or do they branch off into a separate idea? If the latter, consider dividing the offending subordinate clause(s) into separate sentences.

Exercise
Determine which of the sentences contain subordinate clauses that should be branched off into separate sentences. (Don't rewrite the sentences, just identify the sentences that should be rewritten.)

Python is an interpreted language, which means that the language can execute source code directly.
Bash is a modern shell scripting language that takes many of its features from KornShell 88, which was developed at Bell Labs.
Lisp is a programming language that relies on Polish prefix notation, which is one of the systems invented by the Polish logician Jan Łukasiewicz.
I don't want to say that Fortran is old, but only radiocarbon dating can determine its true age.
 Click the icon to see the answer.
We've shaded the subordinate clauses.

Python is an interpreted language, which means that the language can execute source code directly. The subordinate clause in this sentence extends the main idea, so this sentence is fine as is.
Bash is a modern shell scripting language that takes many of its features from KornShell 88, which was developed at Bell Labs. The first subordinate clause extends the main idea, but the second subordinate clause goes in another direction. Divide this sentence in two.
Lisp is a programming language that relies on Polish prefix notation, which is one of the systems invented by the Polish logician Jan Łukasiewicz. The first subordinate clause is clearly critical to the sentence, but the second subordinate clause takes the reader too far away from the main clause. Divide this sentence in two.
I don't want to say that Fortran is old, but only radiocarbon dating can determine its true age. The subordinate clause is critical to the sentence, so this sentence is fine as is.
Distinguish that from which
That and which both introduce subordinate clauses. What's the difference between them? Well, in some countries, the two words are pretty much interchangeable. Inevitably though, alert readers from the United States will angrily announce that you confused the two words again.

In the United States, reserve which for nonessential subordinate clauses, and use that for an essential subordinate clause that the sentence can't live without. For example, the key message in the following sentence is that Python is an interpreted language; the sentence can survive without Guido van Rossum invented:

Python is an interpreted language, which Guido van Rossum invented.

By contrast, the following sentence requires don't involve linear algebra:

Fortran is perfect for mathematical calculations that don't involve linear algebra.

If you read a sentence aloud and hear a pause just before the subordinate clause, then use which. If you don't hear a pause, use that. Go back and read the preceding two example sentences. Do you hear the pause in the first sentence?

Place a comma before which; do not place a comma before that.
...
  Lists and tables

  Good lists can transform technical chaos into something orderly. Technical readers generally love lists. Therefore, when writing, seek opportunities to convert prose into lists.

Choose the correct type of list
The following types of lists dominate technical writing:

Bulleted lists
Numbered lists
Embedded lists
Use a bulleted list for unordered items; use a numbered list for ordered items. In other words:

If you rearrange the items in a bulleted list, the list's meaning does not change.
If you rearrange the items in a numbered list, the list's meaning changes.
For example, we've made the following a bulleted list because rearranging its items does not change the list's meaning:

Bash provides the following string manipulation mechanisms:

Deleting a substring from the start of a string
Reading an entire file into one string variable
The following list, by contrast, must be a numbered list because rearranging its items would change the list's meaning:

Take the following steps to reconfigure the server:

Stop the server.
Edit the configuration file.
Restart the server.
An embedded list (sometimes called a run-in list) contains items stuffed within a sentence. For example, the following sentence contains an embedded list with four items.

The llamacatcher API enables callers to create and query llamas, analyze alpacas, delete vicunas, and track dromedaries.

Generally speaking, embedded lists are a poor way to present technical information. Try to transform embedded lists into either bulleted lists or numbered lists. For example, you should convert the sentence containing the embedded list into the following passage:

The llamacatcher API enables callers to do the following:

Create and query llamas.
Analyze alpacas.
Delete vicunas.
Track dromedaries.
Exercise
Convert the following paragraph into one or more lists:

Today at work, I have to code three unit tests, write a design document, and review Janet's latest document. After work, I have to wash my car without using any water and then dry it without using any towels.

Don't forget to introduce your list(s).

 Click the icon to see the answer.
Here's one possible answer:
I must do the following at work today:

Code three unit tests.
Write a design document.
Review Janet's latest document.
After work, I must do the following:

Wash my car without using any water.
Dry my car without using any towels.
The following is an alternative answer:

I must do the following tasks today:

At work:
Code three unit tests.
Write a design document.
Review Janet's latest document.
After work:
Wash my car without using any water.
Dry my car without using any towels.
Keep list items parallel
What separates effective lists from defective lists? Effective lists are parallel; defective lists tend to be nonparallel. All items in a parallel list look like they "belong" together. That is, all items in a parallel list match along the following parameters:

Grammar
Logical category
Capitalization
Punctuation
Conversely, at least one item in a nonparallel list fails at least one of the preceding consistency checks.

For example, the following list is parallel because all the items are plural nouns (grammar), edible (logical category), in title case (capitalization), and without periods or commas (punctuation).

Carrots
Potatoes
Cabbages
By contrast, the following list is painfully nonparallel along all parameters:

Carrots
Potatoes
The summer light obscures all memories of winter.
The following list is parallel because all the items are complete sentences with complete sentence capitalization and punctuation:

Carrots contain lots of Vitamin A.
Potatoes taste delicious.
Cabbages provide oodles of Vitamin K.
The first item in a list establishes a pattern that readers expect to see repeated in subsequent items.

Exercise
Is the following list parallel or nonparallel?

Broccoli inspires feelings of love or hate.
Potatoes taste delicious.
Cabbages.
 Click the icon to see the answer.
The list is nonparallel. The first two items are complete sentences, but the third item is not a sentence. (Don't be fooled by the capitalization and punctuation of the third item.)

Exercise
Is the following list parallel or nonparallel?

The red dots represent sick trees.
Immature trees are represented by the blue dots.
The green dots represent healthy trees.
 Click the icon to see the answer.
This is a nonparallel list. The first and third items are in active voice, but the second item is in passive voice.

Start numbered list items with imperative verbs
Consider starting all items in a numbered list with an imperative verb. An imperative verb is a command, such as open or start. For example, notice how all of the items in the following parallel numbered list begin with an imperative verb:

Download the Frambus app from Google Play or iTunes.
Configure the Frambus app's settings.
Start the Frambus app.
The following numbered list is nonparallel because two of the sentences start with an imperative verb, but the third item does not:

Instantiate the Froobus class.
Invoke the Froobus.Salmonella() method.
The process stalls.
Exercise
Make the following list parallel. Ensure that each element in the result list begins with an imperative verb:

Stop Frambus
The key configuration file is /etc/frambus. Open this file with an ASCII text editor.
In this file, you will see a parameter named Carambola, which is currently set to the default value (32). Change this value to 64.
When you are finished setting this parameter, save and close the configuration file
now, start Frambus again.
 Click the icon to see the answer.
The following is one possible answer:

Stop Frambus.
Open the key configuration file, /etc/frambus, with an ASCII text editor.
Change the Carambola parameter from its default value (32) to 64.
Save and close the configuration file.
Restart Frambus.
Punctuate items appropriately
Though different style guides offer conflicting advice about punctuating list items, the Google developer documentation style guide recommends (with some exceptions) starting each list item with a capital letter. For example:

Loops
Conditionals
Variable declarations
If a list item is a sentence, use appropriate sentence-ending punctuation. For example:

Open the program.
Click the settings icon.
Create useful tables
Analytic minds tend to love tables. Given a page containing multiple paragraphs and a single table, engineers' eyes zoom towards the table.

Consider the following guidelines when creating tables:

Label each column with a meaningful header. Don't make readers guess what each column holds.
Avoid putting too much text into a table cell. If a table cell holds more than two sentences, ask yourself whether that information belongs in some other format.
Although different columns can hold different types of data, strive for parallelism within individual columns. For instance, the cells within a particular table column should not be a mixture of numerical data and famous circus performers.
Note: Some tables don't render well across all form factors. For example, a table that looks great on your laptop may look awful on your phone.
Introduce each list and table
We recommend introducing each list and table with a sentence that tells readers what the list or table represents. In other words, give the list or table context. Terminate the introductory sentence with a colon rather than a period.

Although not a requirement, we recommend putting the word following into the introductory sentence. For example, consider the following introductory sentences:

The following list identifies key performance parameters:

Take the following steps to install the Frambus package:

The following table summarizes our product's features against our key competitors' features:

Exercise
Write an introductory sentence for the following table:

Language	Inventor	Year Introduced	Key Feature
Lisp	John McCarthy	1958	recursion
C++	Bjarne Stroustrup	1979	OOP
Python	Guido van Rossum	1994	simplicity
 Click the icon to see the answer.
Here are a couple of possible introductory sentences for the table:

The following table contains a few key facts about some popular programming languages:
The following table identifies the inventor, year of invention, and key feature of three popular programming languages:
...
  Paragraphs
This unit provides some guidelines on building cohesive paragraphs. But first, here is an inspirational message:

The work of writing is simply this: untangling the dependencies among the parts of a topic, and presenting those parts in a logical stream that enables the reader to understand you.

Write a great opening sentence
The opening sentence is the most important sentence of any paragraph. Busy readers focus on opening sentences and sometimes skip over subsequent sentences. Therefore, focus your writing energy on opening sentences.

Good opening sentences establish the paragraph's central point. For example, the following paragraph features an effective opening sentence:

A loop runs the same block of code multiple times. For example, suppose you wrote a block of code that detected whether an input line ended with a period. To evaluate a million input lines, create a loop that runs a million times.

The preceding opening sentence establishes the theme of the paragraph as an introduction to loops. By contrast, the following opening sentence sends readers in the wrong direction:

A block of code is any set of contiguous code within the same function. For example, suppose you wrote a block of code that detected whether an input line ended with a period. To evaluate a million input lines, create a loop that runs a million times.

Exercise
Is the opening sentence of the following paragraph effective or defective?

The Pythagorean Theorem states that the sum of the squares of both legs of a right triangle is equal to the square of the hypotenuse. The k-means clustering algorithm relies on the Pythagorean Theorem to measure distances. By contrast, the k-median clustering algorithm relies on the Manhattan Distance.

 Click the icon to see the answer.
This opening sentence is defective because it implies that the paragraph will focus on the Pythagorean Theorem. In fact, the paragraph's focus is actually clustering algorithms. The following would be a more effective opening sentence:

Different clustering algorithms measure distances differently.

 

Note: Effective opening sentences can take many forms. That is, not all great paragraphs start with a sentence that states the theme. Starting a paragraph with a rhetorical question, for example, can engage readers.
Focus each paragraph on a single topic
A paragraph should represent an independent unit of logic. Restrict each paragraph to the current topic. Don't describe what will happen in a future topic or what happened in a past topic. When revising, ruthlessly delete (or move to another paragraph) any sentence that doesn't directly relate to the current topic.

For example, assume that the opening sentence of the following paragraph does focus on the correct topic. Can you spot the sentences that should be removed from the following paragraph?

The Pythagorean Theorem states that the sum of the squares of both legs of a right triangle is equal to the square of the hypotenuse. The perimeter of a triangle is equal to the sum of the three sides. You can use the Pythagorean Theorem to measure diagonal distances. For example, if you know the length and width of a ping-pong table, you can use the Pythagorean Theorem to determine the diagonal distance. To calculate the perimeter of the ping-pong table, sum the length and the width, and then multiply that sum by 2.

We've crossed out the second and fifth sentences to yield a paragraph focused exclusively on the Pythagorean Theorem:

The Pythagorean Theorem states that the sum of the squares of both legs of a right triangle is equal to the square of the hypotenuse. The perimeter of a triangle is equal to the sum of the three sides. You can use the Pythagorean Theorem to measure diagonal distances. For example, if you know the length and width of a ping-pong table, you can use the Pythagorean Theorem to determine the diagonal distance. To calculate the perimeter of the ping-pong table, sum the length and the width, and then multiply that sum by 2.

Exercise
Remove the extraneous sentence(s) from the following paragraph. Assume that the opening sentence does establish the desired theme for the paragraph:

Spreadsheets provide a great way to organize data. Think of a spreadsheet as a table with rows and columns. Spreadsheets also provide mathematical functions, such as means and standard deviations. Each row holds details about one entity. Each column holds details about a particular parameter. For example, you can create a spreadsheet to organize data about different trees. Each row would represent a different type of tree. Each column would represent a different characteristic, such as the tree's height or the tree's spread.

 Click the icon to see the answer.
The paragraph focuses on spreadsheets as a way of organizing data. The third sentence distracts from that theme. Move the third sentence to another paragraph about mathematical operations in spreadsheets.
Spreadsheets provide a great way to organize data. Think of a spreadsheet as a table with rows and columns. Spreadsheets also provide mathematical functions, such as means and standard deviations. Each row holds details about one entity. Each column holds details about a particular parameter. For example, you can create a spreadsheet to organize data about different trees. Each row would represent a different type of tree. Each column would represent a different characteristic, such as the tree's height or the tree's spread.
Don't make paragraphs too long or too short
Long paragraphs are visually intimidating. Very long paragraphs form a dreaded "wall of text" that readers ignore. Readers generally welcome paragraphs containing three to five sentences, but will avoid paragraphs containing more than about seven sentences. When revising, consider dividing very long paragraphs into two separate paragraphs.

Conversely, don't make paragraphs too short. If your document contains plenty of one-sentence paragraphs, your organization is faulty. Seek ways to combine those one-sentence paragraphs into cohesive multi-sentence paragraphs or possibly into lists.

Answer what, why, and how
Good paragraphs answer the following three questions:

What are you trying to tell your reader?
Why is it important for the reader to know this?
How should the reader use this knowledge? Alternatively, how should the reader know your point to be true?
For example, the following paragraph answers what, why, and how:

The garp() function returns the delta between a dataset's mean and median. Many people believe unquestioningly that a mean always holds the truth. However, a mean is easily influenced by a few very large or very small data points. Call garp() to help determine whether a few very large or very small data points are influencing the mean too much. A relatively small garp() value suggests that the mean is more meaningful than when the garp() value is relatively high.
...
  Audience

  The course designers believe that you are probably comfortable with mathematics. Therefore, this unit begins with an equation:

good documentation = knowledge and skills your audience needs to do a task − your audience's current knowledge and skills

In other words, make sure your document provides the information that your audience needs but doesn't already have. Therefore, this unit explains how to do the following:

Define your audience.
Determine what your audience needs to learn.
Fit documentation to your audience.
As the following video suggests, targeting the wrong audience can be messy:


Define your audience
Serious documentation efforts spend considerable time and energy on defining their audience. These efforts might involve surveys, user experience studies, focus groups, and documentation testing. You probably don't have that much time, so this unit takes a simpler approach.

Begin by identifying your audience's role(s). Sample roles include:

Software engineers
Technical, non-engineer roles (such as technical program managers)
Scientists
Professionals in scientific fields (for example, physicians)
Undergraduate engineering students
Graduate engineering students
Non-technical positions
We happily appreciate that many people in non-technical roles have great technical and mathematical skills. However, roles remain an essential first-order approximation in defining your audience. People within the same role generally share certain base skills and knowledge. For example:

Most software engineers know popular sorting algorithms, big O notation, and at least one programming language. Therefore, you can depend on software engineers knowing what O(n) means, but you can't depend on non-technical roles knowing O(n).
A research report targeted at physicians should look very different from a newspaper article about the same research aimed at a lay audience.
A professor's explanation of a new machine learning approach to graduate students should differ from the explanation to first-year undergraduate students.
Writing would be so much easier if everyone in the same role shared exactly the same knowledge. Unfortunately, knowledge within the same role quickly diverges. Amal is an expert in Python, Sharon's expertise is C++, and Micah's is in Java. Kara loves Linux, but David only knows iOS.

Roles, by themselves, are insufficient for defining an audience. That is, you must also consider your audience's proximity to the knowledge. The software engineers in Project Frombus know something about related Project Dingus but nothing about unrelated Project Carambola. The average heart specialist knows more about ear problems than the average software engineer but far less than an audiologist.

Time also affects proximity. Almost all software engineers, for example, studied calculus. However, most software engineers don't use calculus in their jobs, so their knowledge of calculus gradually fades. Conversely, experienced engineers typically know vastly more about their current project than new engineers on the same project.

Sample audience analysis
The following is a sample audience analysis for fictitious Project Zylmon:

The target audience for Project Zylmon falls into the following roles:

Software engineers
Technical product managers
The target audience has the following proximity to the knowledge:

My target audience already knows the Zyljeune APIs, which are somewhat similar to the Zylmon APIs.
My target audience knows C++, but has not typically built C++ programs in the new Winged Victory development environment.
My target audience took linear algebra in university, but many members of the team need a refresher on matrix multiplication.
Determine what your audience needs to learn
Write down a list of everything your target audience needs to learn to accomplish goals. In some cases, the list should hold tasks that the target audience needs to perform. For example:

After reading the documentation, the audience will know how to do the following tasks:

Use the Zylmon API to list hotels by price.
Use the Zylmon API to list hotels by location.
Use the Zylmon API to list hotels by user ratings.
Note that your audience must sometimes master tasks in a certain order. For example, your audience might need to learn how to build and execute programs in a new development environment before learning how to write particular kinds of programs.

If you are writing a design spec, then your list should focus on information your target audience should learn rather than on mastering specific tasks. For example:

After reading the design spec, the audience will learn the following:

Three reasons why Zylmon outperforms Zyljeune.
Five reasons why Zylmon consumed 5.25 engineering years to develop.
Fit documentation to your audience
Writing to meet your audience's needs requires unselfish empathy. You must create explanations that satisfy your audience's curiosity rather than your own. How do you step out of yourself in order to fit documentation to the audience? Unfortunately, we can offer no easy answers. We can, however, offer a few parameters to focus on.

Vocabulary and concepts
Match your vocabulary to your audience. See Words for help.

Be mindful of proximity. The people on your team probably understand your team's abbreviations, but do people on other teams understand those same abbreviations? As your target audience widens, assume that you must explain more.

Similarly, experienced people on your software team probably understand the implementation details and data structures of your team's project, but nearly everyone else (including new members of your team) does not. Unless you are writing specifically for other experienced members of your team, you typically must explain more than you expect.

Curse of knowledge
Experts often suffer from the curse of knowledge, which means that their expert understanding of a topic ruins their explanations to newcomers. As experts, it is easy to forget that novices don’t know what you already know. Novices might not understand explanations that make passing reference to subtle interactions and deep systems that the expert doesn’t stop to explain.

From the novice's point of view, the curse of knowledge is a "File not found" linker error due to a module not yet compiled.

Exercise
Assume that the following paragraph is the start of a paper aimed at physicians who have never programmed before. Identify the aspects of the paragraph that suffer from the curse of knowledge:

C is a mid-level language, higher than assembly language but lower than Python and Java. The C language provides programmers fine-grained control over all aspects of a program. For example, using the C Standard Library, it is easy to allocate and free blocks of memory. In C, manipulating pointers directly is mundane.

Suppose the preceding paragraph was aimed at undergraduate computer science students new to C but comfortable with Python. Does the paragraph still suffer from the curse of knowledge?

 Click the icon to see the answer.
This paragraph suffers immensely from the curse of knowledge. The target audience has never programmed before, so the following terms are inappropriate or unfamiliar:
Language
Mid-level language
Assembly language
Python
Java
Program
C Standard Library
Allocate and free blocks of memory
Pointers
This paragraph also suffers from the curse of knowledge for the alternative audience. The average Python programmer is unaware of manipulating memory or pointers. A better introductory paragraph would compare and contrast C with Python.
Simple words
English has become the dominant language for technical communication worldwide. However, a significant percentage of technical readers are more comfortable in languages other than English. Therefore, prefer simple words over complex words; avoid obsolete or overly-complex English words. Sesquipedalian and rare words repel some readers.

Cultural neutrality and idioms
Keep your writing culturally neutral. Do not require readers to understand the intricacies of NASCAR, cricket, or sumo in order to understand how a piece of software works. For example, the following sentence—packed with baseball metaphors as American as apple pie—might puzzle some Parisian readers:

If Frambus 5.0 was a solid single, Frambus 6.0 is a stand-up double.

Idioms are phrases whose overall meaning differs from the literal meaning of the individual words in that phrase. For example, the following phrases are idioms:

a piece of cake
Bob's your uncle
Cake? Bob? Most readers from the United States recognize the first idiom; most British readers recognize the second idiom. If you are writing strictly for a British audience, then Bob's your uncle can be fine. However, if you are writing for an international audience, then replace that idiom with this task is done.

Idioms are so deeply ingrained in our speech that the special nonliteral meaning of idioms becomes invisible to us. That is, idioms are another form of the curse of knowledge.

Note that some people in your audience use translation software to read your documentation. Translation software tends to struggle more with cultural references and idioms than with plain, simple English.

Exercise
Identify the problems with the following sentences:

As of Version 3.0, it was still kosher to call the Frambus method.
Deciding which BlogResource constraints are combinable is a sticky wicket.
Be that as it may, you still have to write unit tests.
 Click the icon to see the answer.
In some places in the world, kosher has become slang for "acceptable usage." Many readers, however, will wonder how religious dietary laws pertain to software.
A sticky wicket is British slang, which does not travel well. Substituting the phrase challenging problem will fix this issue.
Be that as it may is an idiom. Substituting the transition However will fix this problem.
...
  You can write sentences. You can write paragraphs. Can you organize all those paragraphs into a coherent document?

State your document's scope
A good document begins by defining its scope. For example:

This document describes the design of Project Frambus.

A better document additionally defines its non-scope—the topics not covered that the target audience might reasonably expect your document to cover. For example:

This document does not describe the design for the related technology, Project Froobus.

Scope and non-scope statements benefit not only the reader but also the writer (you). While writing, if the contents of your document veer away from the scope statement (or venture into the non-scope statement), then you must either refocus your document or modify your scope statement. When reviewing your first draft, delete any sections that don't help satisfy the scope statement.

Exercise
What problem do you see in the following paragraph?

This document explains how to use the Frambus API to create, update, and publish Fwidgets. This document does not explain how to use the Frambus API to delete Fwidgets or cover the history of the Linux operating system.

 Click the icon to see the answer.
State your audience
A good document explicitly specifies its audience. For example:

This document is aimed at the following audiences:

software engineers
program managers
Beyond the audience's role, a good audience declaration might also specify any prerequisite knowledge or experience. For example:

This document assumes that you understand matrix multiplication and the fundamentals of backpropagation.

In some cases, the audience declaration should also specify prerequisite reading or coursework. For example:

You must read "Project Froobus: A New Hope" prior to reading this document.

Summarize key points at the start
Engineers and scientists are busy people who won't necessarily read all 76 pages of your design document. Imagine that your peers might only read the first paragraph of your document. Therefore, ensure that the start of your document answers your readers' essential questions.

Professional writers focus considerable energy on page one to increase the odds of readers making it to page two. However, the start of any long document is the hardest page to write. Be prepared to revise page one many times.

Compare and contrast
In your career, no matter how creative you are, you will author precious few documents containing truly revolutionary ideas. Most of your work will be evolutionary, building on existing technologies and concepts. Therefore, compare and contrast your ideas with concepts that your audience already understands. For example:

This new app is similar to the Frambus app, except with much better graphics.

Or:

The Froobus API handles the same use cases as the Frambus API, except that the Froobus API is much easier to use.

Exercise
What problem do you see in the following introduction?

Frambus Weather app v2 introduces ten features not available in Frambus Weather app v1. Most importantly, v2 offers two-week forecasts, v1 offered only one-week forecasts. Tidal information won't change.

 Click the icon to see the answer.
Write for your audience
This course repeatedly emphasizes the importance of defining your audience. In this section, we focus on audience definition as a means of organizing your document.

Define your audience's needs
Answering the following questions helps you determine what your document should contain:

Who is your target audience?
What is your target audience's goal? Why are they reading this document?
What do your readers already know before they read your document?
What should your readers know or be able to do after they read your document?
For example, suppose you have invented a new sorting algorithm, which is similar to quicksort. The following list contains some potential answers to the preceding questions:

Who is your target audience? The target audience consists of all the software engineers in my organization.
What is your target audience's goal? My target audience wants to find more efficient ways to sort data. They are reading this document to determine whether this new algorithm is worth implementing.
What do your readers already know before they read your document? My target audience knows how to write code and has previously studied sorting algorithms, including quicksort. However, most people in my target audience haven't implemented or evaluated a sorting algorithm in several years.
What should your readers know or be able to do after they read your document? My target audience will be able to do all of the following:
Understand how the algorithm compares and contrasts with quicksort.
Identify the two kinds of datasets for which the algorithm outperforms the quicksort algorithm.
Implement the algorithm in their choice of programming language.
Identify the two edge cases in which the algorithm performs poorly.
Organize the document to meet your audience's needs
After defining the audience's needs, organize the document to help readers get the information they need. For example, based on the answers in the previous section, the outline for the document could look as follows:

Overview of the algorithm
Compare and contrast with quicksort, including Big O comparisons
Link to Wikipedia article on quicksort
Optimal datasets for the algorithm
Implementing the algorithm
Implementation in pseudocode
Implementation tips, including common mistakes
Deeper analysis of algorithm
Edge cases
Known unknowns
...
  Punctuation

  This optional unit provides a quick refresher on punctuation marks.

Commas
Programming languages enforce clear rules about punctuation. In English, by contrast, the rules regarding commas are somewhat hazier. As a guideline, insert a comma wherever a reader would naturally pause somewhere within a sentence. For the musically inclined, if a period is a whole note rest, then a comma is perhaps a half-note or quarter-note rest. In other words, the pause for a comma is shorter than that for a period. For example, if you read the following sentence aloud, you probably rest briefly before the word just:

C behaves as a mid-level language, just a couple of steps up in abstraction from assembly language.

Some situations require a comma. For example, use commas to separate items in an embedded list like the following:

Our company uses C++, Python, Java, and JavaScript.

You might be wondering about a list's final comma, the one inserted between items N-1 and N. This comma—known as the serial comma or Oxford comma—is controversial. We recommend supplying that final comma simply because technical writing requires picking the least ambiguous solution. That said, we actually prefer circumventing the controversy by converting embedded lists into bulleted lists.

In sentences that express a condition, place a comma between the condition and the consequence. For example, both of the following sentences supply the comma in the correct place:

If the program runs slowly, try the --perf flag.

If the program runs slowly, then try the --perf flag.

You can also wedge a quick definition or digression between a pair of commas as in the following example:

Python, an easy-to-use language, has gained significant momentum in recent years.

Finally, avoid using a comma to paste together two independent thoughts. For example, the comma in the following sentence is guilty of a punctuation felony called a comma splice:

Not recommended

Samantha is a wonderful coder, she writes abundant tests.

Use a period rather than a comma to separate two independent thoughts. For example:

Recommended

Samantha is a wonderful coder. She writes abundant tests.

Exercise
Add commas where appropriate to the following passage:

Protocol Buffers sometimes known as protobufs are our team's main structured data format. Use Protocol Buffers to represent store and transfer structured data. Unlike XML Protocol Buffers are compiled. Consequently clients transmit Protocol Buffers efficiently which has led to rapid adoption.

Hint: Read the passage aloud and put a comma everywhere you hear a short pause.

 Click the icon to see the answer.
Here is one possible solution:

Protocol Buffers, sometimes known as protobufs, are our team's main structured data format. Use Protocol Buffers to represent, store, and transfer structured data. Unlike XML, Protocol Buffers are compiled. Consequently, clients transmit Protocol Buffers efficiently, which has led to rapid adoption.
Semicolons
A period separates distinct thoughts; a semicolon unites highly related thoughts. For example, notice how the semicolon in the following sentence unites the first and second thoughts:

Recommended

Rerun Frambus after updating your configuration file; don't rerun Frambus after updating existing source code.

Before using a semicolon, ask yourself whether the sentence would still make sense if you flipped the thoughts to opposite sides of the semicolon. For example, reversing the earlier example still yields a valid sentence:

Don't rerun Frambus after updating existing source code; rerun Frambus after updating your configuration file.

The thoughts preceding and following the semicolon must each be grammatically complete sentences. For example, the following semicolon is incorrect because the passage following the semicolon is a clause, not a complete sentence:

Not recommended

Rerun Frambus after updating your configuration file; not after updating existing source code.

Recommended

Rerun Frambus after updating your configuration file, not after updating existing source code.

You should almost always use commas, not semicolons, to separate items in an embedded list. For example, the following use of semicolons is incorrect:

Not recommended

Style guides are bigger than the moon; more essential than oxygen; and completely inscrutable.

As mentioned earlier in this lesson, technical writing usually prefers bulleted lists to embedded lists. However, if you truly prefer an embedded list, use commas rather than semicolons to separate the items, as in the following example:

Recommended

Style guides are bigger than the moon, more essential than oxygen, and completely inscrutable.

Many sentences place a transition word or phrase immediately after the semicolon. In this situation, place a comma after the transition. Note the comma after the transition in the following two examples:

Frambus provides no official open source package for string manipulation; however, subsets of string manipulation packages are available from other open source projects.

Even seemingly trivial code changes can cause bugs; therefore, write abundant unit tests.

Exercise
Which of the following periods or commas could you replace with a semicolon?

Python is a popular programming language. The C language was developed long before Python.
Model learning for a low value of X appears in the top illustration. Model learning for a high value of X appears in the bottom illustration.
I'm thankful for my large monitor, powerful CPU, and blazing bandwidth.
 Click the icon to see the answer.
You may not convert the period in #1 to a semicolon because the two sentences are only vaguely related.
You may replace the period in #2 with a semicolon because the two sentences are so highly related.
You may not convert the commas in #3 to semicolons. Use commas to separate items in an embedded list.
Em dashes
Em dashes are compelling punctuation marks, rich with punctuation possibilities. An em dash represents a longer pause—a bigger break—than a comma. For the musically fluent, think of a comma as a quarter note rest and an em dash as a half-note rest. For example:

C++ is a rich language—one requiring extensive experience to fully understand.

Writers sometimes use a pair of em dashes to block off a digression, as in the following example:

Protocol Buffers—often nicknamed protobufs—encode structured data in an efficient yet extensible format.

Could we have used commas instead of em dashes in the preceding examples? Sure. Why did we choose an em dash instead of a comma? Feel. Art. Experience.

En dashes and hyphens
Consider the horizontal punctuation marks shown in the following table:

Name	Mark	Relative width
em dash	—	widest (usually, the length of the letter m)
en dash	–	medium (usually, the length of the letter n)
hyphen	-	narrowest
Some style guides recommend the en dash for certain uses. The Google Style Guide, however, offers the following blunt advice about en dashes:

Don't use.

Hyphens are tricky. Within technical writing, hyphens connect words in certain compound terms, such as:

Self-attention
N-gram
Confusingly, three-word compound terms often contain a hyphen between the first and second word but not between the second and third word. For example:

Decision-making system
Floating-point feature
When in doubt about hyphens, consult a dictionary, glossary, or style guide.

Note: If you consult more than one dictionary, glossary, or style guide about hyphens, you may encounter inconsistencies.
Colons
In technical writing, use a colon to alert readers that a list or table will follow. In other words, terminate the sentence that introduces a list or table with a colon. In the following example, notice the colon at the end of the sentence that introduces the list:

Consider the following important programming languages:

Python
Java
C++
Technical writing prefers bulleted lists or numbered lists to embedded lists. That said, you can use a colon to introduce an embedded list as in the following example:

Consider the following important programming languages: Python, Java, and C++.

Not all embedded lists require a colon. For example:

My three favorite programming languages are Python, Java, and anything other than C++.

Parentheses
Use parentheses to hold minor points and digressions. Parentheses inform readers that the enclosed text isn't critical. Because the enclosed text isn't critical, some editors feel that text that deserves parentheses doesn't deserve to be in the document. As a compromise, keep parentheses to a minimum in technical writing.

The rules regarding periods and parentheses aren't always clear. Here are the standard rules:

If a pair of parentheses holds an entire sentence, the period goes inside the closing parenthesis.
If a pair of parentheses ends a sentence but does not hold the entire sentence, the period goes just outside the closing parenthesis.
For example:

(Incidentally, Protocol Buffers make great birthday gifts.)

Binary mode relies on the more compact native form (described later in this document).

...
Markdown
Markdown is a lightweight markup language that many technical professionals use to create and edit technical documents. With Markdown, you write text in a plain text editor (such as vi or Emacs), inserting special characters to create headers, boldface, bullets, and so on. For example, the following example shows a simple technical document formatted with Markdown:


## bash and ksh

**bash** closely resembles an older shell named **ksh**.  The key
*practical* difference between the two shells is as follows:

*  More people know bash than ksh, so it is easier to get help for bash
   problems than ksh problems.
The rendered version of the preceding technical document looks as follows:

bash and ksh
bash closely resembles an older shell named ksh. The key practical difference between the two shells is as follows:

More people know bash than ksh, so it is easier to get help for bash problems than ksh problems.
A Markdown parser converts Markdown files into HTML. Browsers can then display the resulting HTML to readers.

We recommend becoming comfortable with Markdown by taking one of the following tutorials:

www.markdowntutorial.com
Mastering Markdown
What's next?
Congratulations: you've completed the pre-class work for Technical Writing One.

If the in-class portion of Technical Writing One is available in your organization, please take it. If you'd like to facilitate the in-class portion of Technical Writing One, see the facilitator's guide.

A quick compilation of the topics covered in Technical Writing One is available on the Summary page.

...
Summary

Technical Writing One covered the following basic lessons of technical writing:

Use terms consistently.
Avoid ambiguous pronouns.
Prefer active voice to passive voice.
Pick specific verbs over vague ones.
Focus each sentence on a single idea.
Convert some long sentences to lists.
Eliminate unneeded words.
Use a numbered list when ordering is important and a bulleted list when ordering is irrelevant.
Keep list items parallel.
Start numbered list items with imperative words.
Introduce lists and tables appropriately.
Create great opening sentences that establish a paragraph's central point.
Focus each paragraph on a single topic.
Determine what your audience needs to learn.
Fit documentation to your audience.
Establish your document's key points at the start of the document.
Congratulations! You've completed the pre-class portion of Technical Writing One.
...

--- Technical Writing Two introduction ---
Technical Writing Two
Was this helpful?

Send feedbackTechnical Writing Two introduction 

bookmark_border
Technical Writing Two helps technical people improve their technical communication skills.

Target audience
We've aimed this course at people who have completed Technical Writing One and are still hungry for more technical writing training. If you've never taken any technical writing training, we recommend completing Technical Writing One before taking this class.

Learning objectives
This course focuses on several intermediate topics in technical writing. After completing this class, you will know how to do the following:

Choose among several different tactics to write first drafts and additional tactics for writing second and third drafts.
Use several techniques to detect mistakes in your own writing.
Organize large documents.
Introduce a document's scope and any prerequisites.
Write clear figure captions.
Pick the proper information density in technical illustrations.
Focus the reader's attention in illustrations.
Establish context through a "big picture" illustration.
Revise technical illustrations effectively.
Create useful, accurate, concise, clear, reusable, and well-commented sample code that demonstrates a range of complexity.
Identify different documentation types.
Describe just about anything.
Empathize with a beginner audience and write a tutorial for them.
It takes years of focused practice to become a great engineer or a great technical writer. This course will improve your technical writing but will not instantly transform you into a great technical writer.

...
  Self-editing 

  Imagine that you just wrote the first draft of a document. How do you make it better? In most cases, working towards a final published document is an iterative process. Transforming a blank page into a first draft is often the hardest step. After you write a first draft, make sure you set aside plenty of time to refine your document.

The editing tips in this unit can help turn your first draft into a document that more clearly communicates the information your audience needs. Use one tip or use them all; the important thing is to find a strategy that works for you, and then make that strategy part of your writing routine.

Note: The tips in this unit build on the basic writing and editing skills from Technical Writing One. This unit includes a summary of useful editing techniques from that course. For a more detailed refresher, visit the self-study units from Technical Writing One.
Adopt a style guide
Companies, organizations, and large open source projects frequently either adopt an existing style guide for their documentation or write their own. Many of the documentation projects on the Google Developers site follow the Google Developer Documentation Style Guide. If you've never relied on a style guide before, at first glance the Google Developer Documentation Style Guide might seem a little intimidating, offering detailed guidance on topics such as grammar, punctuation, formatting, and documenting computer interfaces. You might prefer to start by adopting the style-guide highlights.

Note: For smaller projects, such as team documentation or a small open source project, you might find the highlights are all you need.
Some of the guidelines listed in the highlights are covered in Technical Writing One. You might recall some of the following techniques:

Use active voice to make clear who's performing the action.
Format sequential steps as numbered lists.
Format most other lists as bulleted lists.
The highlights introduce many other techniques that can be useful when writing technical documentation, such as:

Write in the second person. Refer to your audience as "you", not "we".
Place conditions before instructions, not after.
Format code-related text as code font.
Think like your audience
Who is your audience? Step back and try to read your draft from their point of view. Make sure the purpose of your document is clear, and provide definitions for any terms or concepts that might be unfamiliar to your readers.

It can be helpful to outline a persona for your audience. A persona can consist of any of the following attributes:

A role, such as Systems Engineer or QA Tester.
An end goal, such as Restore the database.
A set of assumptions about the persona and their knowledge and experience. For example, you might assume that your persona is:
Familiar with Python.
Running a Linux operating system.
Comfortable following instructions for the command line.
You can then review your draft with your persona in mind. It can be especially useful to tell your audience about any assumptions you've made. You can also provide links to resources where they can learn more if they need to brush up on a specific topic.

Note that relying too heavily on a persona (or two) can result in a document that is too narrowly focused to be useful to the majority of your readers.

For a refresher and more information on this topic from Technical Writing One, see the Audience self-study unit.

Read it out loud
Depending on the context, the style of your writing can alienate, engage, or even bore your audience. The desired style of a given document depends to an extent on the audience. For example, the contributor guide for a new open source project aimed at recruiting volunteers might adopt a more informal and conversational style, while the developer guide for a commercial enterprise application might adopt a more formal style.

To check if your writing is conversational, read it out loud. Listen for awkward phrasing, too-long sentences, or anything else that doesn't feel natural. Alternatively, consider using a screen reader to voice the content for you.

For more information on adjusting the style of your writing to suit your audience, see Style and authorial tone.

Come back to it later
After you write your first draft (or second or third), set it aside. Come back to it after an hour (or two or three) and try to read it with fresh eyes. You'll almost always notice something that you could improve.

Change the context
Some writers like to print their documentation and review a paper copy, red pencil in hand. A change of context when reviewing your own work can help you find things to improve. For a modern take on this classic tip, copy your draft into a different document and change the font, size, and color.

Find a peer editor
Just as engineers need peers to review their code, writers need editors to give them feedback on docs. Ask someone to review your document and give you specific, constructive comments. Your peer editor doesn't need to be a subject matter expert on the technical topic of your document, but they do need to be familiar with the style guide you follow.

Exercise
If you have a document that you're working on, use one or more of the tips on this page to make it better. If you don't have a document in progress, edit the paragraph below.

Determine whether or not you can simplify your document through the use of terminology that is equivalent but relatively shorter in length and therefore more easily comprehensible by your audience. It's important to make sure your document is edited before it is seen by your audience, which might include people that are less or more familiar with the matter covered by your document. The first thing you need is a rough draft. Some things that can help make your document easier to read are making sure you have links to background information, and also checking for active voice instead of passive voice. If you have long sentences you can consider shortening them or implementing the use of a list to make the information easier to scan.

 Click the icon to see the answer.
To help your audience understand your document, apply these basic editing principles:

Use active voice instead of passive voice.
Consider using simpler words that mean the same thing.
Include links to background information.
Break long sentences into shorter sentences or lists.
...
Organizing large documents

How do you organize a large collection of information into a cohesive document or website? Alternatively, how do you reorganize an existing messy document or website into something approachable and useful? The following tactics can help:

Choosing to write a single, large document or a set of documents
Organizing a document
Adding navigation
Disclosing information progressively
When to write large documents
You can organize a collection of information into longer standalone documents or a set of shorter interconnected documents. A set of shorter interconnected documents is often published as a website, wiki, or similar structured format.

Some readers respond more positively than others to longer documents. Consider the following perspectives from two hypothetical readers you're writing documentation for:

Hong finds reading long documents difficult and disorientating. He prefers to use site search to find answers to his questions.
Rose is comfortable navigating large documents. She often uses the built-in page search feature in her web browser to find useful information on the current page.
So, should you organize your material into a single document or into a set of documents in a website? Consider the following guidelines:

How-to guides, introductory overviews, and conceptual guides often work better as shorter documents when aimed at readers who are new to the subject matter. For example, a reader who is completely new to your subject matter might struggle to remember lots of new terms, concepts, and facts. Remember that your audience might be reading your documentation to gain a quick and general overview of the topic.
In-depth tutorials, best practice guides, and command-line reference pages can work well as lengthier documents, especially when aimed at readers who already have some experience with the tools and subject matter.
A great tutorial can rely on a narrative to lead the reader through a series of related tasks in a longer document. However, even large tutorials can sometimes benefit from being broken up into smaller parts.
Many longer documents aren't designed to be read in one sitting. For example, users typically scan through a reference page to search for an explanation of a command or flag.
The remainder of this unit covers techniques that can be useful for writing longer documents, such as tutorials and some conceptual guides.

Organize a document
This section suggests some techniques for planning a longer document, including creating an outline and drafting an introduction. After you've completed the first draft of a document, you can review it against your outline and introduction to make sure you haven't missed anything you originally intended to cover.

Outline a document
Starting with a structured, high-level outline can help you group topics and determine where more detail is needed. The outline helps you move topics around before you get down to writing.

You might find it useful to think of an outline as the narrative for your document. There is no standard approach to writing an outline, but the following guidelines provide practical tips you might find useful:

Before you ask your reader to perform a task, explain to them why they are doing it. For example, the following bullet points illustrate a section of an outline from a tutorial about auditing and improving the accessibility of web pages:
Introduce a browser plugin that audits the accessibility of web pages; explain that the reader will use the results of the audit report to fix several bugs.
List the steps to run the plugin and audit the accessibility of a web page.
Limit each step of your outline to describing a concept or completing a specific task.
Structure your outline so that your document introduces information when it's most relevant to your reader. For example, your reader probably doesn't need to know (or want to know) about the history of the project in the introductory sections of your document when they're just getting started with the basics. If you feel the history of the project is useful, then include a link to this type of information at the end of your document.
Consider explaining a concept and then demonstrating how the reader can apply it either in a sample project or in their own work. Documents that alternate between conceptual information and practical steps can be a particularly engaging way to learn.
Before you start drafting, share the outline with your contributors. Outlines are especially useful if you're working with a team of contributors who are going to review and test your document.
Outline exercise
Review and update the following high-level outline of an introduction to a long tutorial. To solve this exercise, you can do any of the following:

Rearrange the existing topics.
Add any missing topics you feel should be in an introduction.
Remove any topics you feel are irrelevant for an introduction.

## The history of the project

Describes the history of the development of the project.

## Prerequisites

Lists concepts the reader should be familiar with prior to starting, as well as
any software or hardware requirements.

## The design of the system

Describes how the system works.

## Audience

Describes who the tutorial is aimed at.

## Setting up the tutorial

Explains how to configure your environment to follow the tutorial.

## Troubleshooting

Explains how to diagnose and solve potential problems that might occur when
working through the tutorial.

## Useful terminology

Lists definitions of terms that the reader needs to know to follow the
tutorial.

 Click the icon to see a possible answer.
The following is one possible solution:

## Audience

Describes who the tutorial is aimed at.

## Prerequisites

Lists concepts the reader should be familiar with prior to starting, as well as
any software or hardware requirements.

## Setting up the tutorial

Explains how to configure your environment to follow the tutorial.

## Useful terminology

Lists definitions of terms that the reader needs to know to follow the
tutorial.
Introduce a document
If readers of your documentation can't find relevance in the subject, they are likely to ignore it. To set the ground rules for your users, we recommend providing an introduction that includes the following information:

What the document covers.
What prior knowledge you expect readers to have.
What the document doesn't cover.
Remember that you want to keep your documentation easy to maintain, so don't try to cover everything in the introduction.

The following paragraph demonstrates the ideas from the preceding list as an overview for a hypothetical document publishing platform called Froobus:


This document explains how to publish Markdown files using the Froobus system.
Froobus is a publishing system that runs on a Linux server and converts
Markdown files into HTML pages. This document is intended for people who are
familiar with Markdown syntax. To learn about the syntax, see the Markdown
reference. You also need to be comfortable running simple commands in a
Linux terminal. This document doesn't include information about installing or
configuring a Froobus publishing system. For information on installing Froobus,
see Getting started.
After you've completed the first draft, check your entire document against the expectations you set in your overview. Does your introduction provide an accurate overview of the topics you cover? You might find it useful to think of this review as a form of documentation quality assurance (QA).

Introduction exercise
For this exercise, review and revise the following introduction for a best practices guide for a hypothetical programming language called F@. Remove any information you feel is irrelevant in this context and add any information you feel is missing.


This guide lists best practices for working with the F@ programming language.
F@ was developed in 2011 as an open source community project. This guide
supplements the F@ style guide. In addition to the best practices in this guide,
make sure you also install the F@ command-line linter and run it on your code.
The programming language is widely adopted in the health industry. If you have
suggestions for additions to the list of best practices, file an issue in the
F@ documentation repository.
 Click the icon to see a possible answer.
The following is one possible solution:

This guide lists best practices for working with the F@ programming language.
Before you review this guide, complete the introductory tutorial for new F@
developers. This guide supplements the F@ style guide. In addition to the best
practices in this guide, make sure you also install the F@ command-line linter
and run it on your code. If you have suggestions for additions to the list of
best practices, file an issue in the F@ documentation repository.
Add navigation
Providing navigation and signposting for your readers ensures they can find what they are looking for and the information they need to get unstuck.

Clear navigation includes:

introduction and summary sections
a clear, logical development of the subject
headings and subheadings that help users understand the subject
a table of contents menu that shows users where they are in the document
links to related resources or more in-depth information
links to what to learn next
The tips in the following sections can help you plan the headings in your documentation.

Prefer task-based headings
Choose a heading that describes the task your reader is working on. Avoid headings that rely on unfamiliar terminology or tools. For example, suppose you are documenting the process for creating a new website. To create the site, the reader must initialize the Froobus framework. To initialize the Froobus framework, the reader must run the carambola command-line tool. At first glance, it might seem logical to add either of the following headings to the instructions:

Running the carambola command
Initializing the Froobus framework
Unless your readers are already very experienced with the terminology and concepts for this topic, a more familiar heading might be preferable, such as Creating the site.

Provide text under each heading
Most readers appreciate at least a brief introduction under each heading to provide some context. Avoid placing a level three heading immediately after a level two heading, as in the following example:


## Creating the site
### Running the carambola command
In this example, a brief introduction can help orient the reader:


## Creating the site

To create the site, you run the "carambola" command-line tool. The command
displays a series of prompts to help you configure the site.

### Running the carambola command
Heading exercise
Helping readers navigate through your documentation helps them find the information they need to successfully use your tool. Often, a clear and well-organized table of contents or outline acts like a map that helps your users navigate the functionality of your tool.

For this exercise, improve the following outline. You can rearrange, add, and delete topics and create secondary entries too.


About this tutorial
Advanced topics
Build the asset navigation tree
Define resource paths
Defining and building projects
Launch the development environment
Defining and building resources
What's next
Define image resources
Audience
See also
Build an image resource
Define an image project
Build an image project
Setting up the tutorial
Select the tutorial asset root
About this guide
 Click the icon to see a possible answer.
The following is one possible solution:

## About this tutorial

### Audience

### About this guide

### Advanced topics

## Setting up the tutorial

### Select the tutorial asset root

### Launch the development environment

### Build the asset navigation tree

### Define resource paths

## Defining and building resources

### Define image resources

### Build an image resource

## Defining and building projects

### Define an image project

### Build an image project

## Defining and building databases

### Define a database

### Build a database

## Pushing, publishing, and viewing a database

### Push a database

### Publish a database

### View a database

## Configuring display rules for point data

### Define, configure, and build vector data

## See also

### Sample data files

## What's next
Disclose information progressively
Learning new concepts, ideas, and techniques can be a rewarding experience for many readers who are comfortable reading through documentation at their own pace. However, being confronted with too many new concepts and instructions too quickly can be overwhelming. Readers are more likely to be receptive to longer documents that progressively disclose new information to them when they need it. The following techniques can help you incorporate progressive disclosure in your documents:

Where possible, try introducing new terminology and concepts near the instructions that rely on them.
Break up large walls of text. To avoid multiple large paragraphs on a single page, aim to introduce tables, diagrams, lists, and headings where appropriate.
Break up large series of steps. If you have a particularly long list of complicated steps, try to re-arrange them into shorter lists that explain how to complete sub-tasks.
Start with simple examples and instructions, and add progressively more interesting and complicated techniques. For example, in a tutorial for creating forms, start by explaining how to handle text responses, and then introduce other techniques to handle multiple choice, images, and other response types.
...
  --- Error Messages ---

  This self-study course helps you write clearer, more effective error messages, whether they appear in IDEs, command lines, or GUIs. While this course contains lessons for many error message scenarios, the majority of examples and guidance focus on developer-facing error messages.

Note: Not all guidelines presented in this course are appropriate in every situation for every target audience. Always aim error messages at the product's target audience.
Target audience for this course
We've aimed this course at the following audiences:

Engineers
Program managers
Technical writers
We recommend taking Technical Writing One before taking this error messages course. After all, good error messages are just another form of good technical writing. If you'd prefer to skip Technical Writing One for now, that's okay—you can still benefit from this error messages course.

Why take this course?
Bad error messages frustrate users. Good error messages provide critical information when things are not working as expected. Error messages are often the main way developers interact with users when problems occur. Some error messages are caused by invalid user inputs or misuse of certain features and some are caused by product defects; all error messages require users to figure out what to do next.

Data collected through Google support systems and UX research identified the following common problems with bad error messages:

unactionable
vague
imprecise
confusing
inaccurate
unclear cause
unknown next steps
Conversely, good error messages provide the following benefits:

Deliver the best user experience.
Are actionable.
Are universally accessible. (To learn more, take Tech Writing for Accessibility.)
Enable users to help themselves.
Reduce the support workload.
Enable faster resolution of issues.
Learning objectives
After completing this class, you will know how to do the following:

Write clearer, more helpful error messages.
Review your teammates' error messages.

...
  General error handling rules

  Before we get to the fun part of the course—wording error messages—let's discuss a few general error handling rules.

Don't fail silently
Failure is inevitable; failing to report failures is inexcusable. Failing silently causes the following problems:

Users wonder whether something has gone wrong. ("Why did my order not go through?")
Customer support wonders what caused a problem. ("The log file gave no indication of a problem.")
Embrace your software's fallibility. Assume that humans will make mistakes using your software. Try to minimize ways for people to misuse your software, but assume that you can't completely eliminate misuse. Therefore, plan error messages as you design software.

Follow the programming language guides
Follow the guidelines on error handling in Google's programming language guides, including:

Google C++ Style Guide
Google Java Style Guide
Google Python Style Guide, particularly the Error Messages section
Google JavaScript Style Guide
Google Go Style Guide, particularly the Error handling section
Implement the full error model
Implement the full error model described in the Errors page of the Google AIP. For instance, note the following quote about implementing error messages in services:

Services must return a google.rpc.Status message when an API error occurs, and must use the canonical error codes defined in google.rpc.Code.
The Errors page of the Google Cloud API design guide provides helpful information about implementing the full error model for Google APIs.

Avoid swallowing the root cause
API implementations should not swallow the root cause of issues occurring in the back end. For example, many different situations can cause a "Server error" problem, including:

service failure
network connection drop
mismatching status
permission issues
"Server error" is too general an error message to help users understand and fix the problem. If the server logs contain identification information about the in-session user and operation, we recommend providing additional context on the particular failure case.

Log the error codes
Numeric error codes help customer support monitor and diagnose errors. Consequently, specifying numeric error codes along with textual error messages is often quite valuable.

You can specify error codes for both internal and external errors. For internal errors, provide a proper error code for easy lookup/debugging by internal support personnel and engineers.

Document all error codes.

Raise errors immediately
Raise errors as early as useful. Holding on to errors and then raising them later increases debugging costs dramatically.
...
Identify the error's cause 

bookmark_border
Tell users exactly what went wrong. Be specific—vague error messages frustrate users.

Not recommended

Bad directory.
Recommended

The [Name of directory] directory exists but is not writable. To add files to this directory, the directory must be writable. [Explanation of how to make this directory writable.]
Not recommended

Invalid field 'picture'.
Recommended

The 'picture' field can only appear once on the command line; this command line contains the 'picture' field <N> times.
Note: Prior to version 2.1, you could specify the 'picture' field more than once, but more recent versions no longer support this.

...
Identify the user's invalid inputs 

bookmark_border
If the error involves values that the user can enter or modify (for example, text, settings, command-line parameters), then the error message should identify the offending value(s).

Not recommended

Funds can only be transferred to an account in the same country.
Recommended

You can only transfer funds to an account within the same country. Sender account's country (UK) does not match the recipient account's country (Canada).
Not recommended

Invalid postal code.
Recommended

The postal code for the US must consist of either five or nine digits. The specified postal code (4872953) contained seven digits.
If the invalid input is a very long value that spans many lines, consider doing one of the following:

Disclose the bad input progressively; that is, provide one or more clickable ellipses to enable users to control how much additional error information they want to see.
Truncate the bad input, keeping only its essential parts.
...
  Help users understand requirements and constraints. Be specific. Don't assume that users know the limitations of your system.

Not recommended

The combined size of the attachments is too big.
Recommended

The combined size of the attachments (14MB) exceeds the allowed limit (10MB). [Details about possible solution.]
Not recommended

Permission denied.
Recommended

Permission denied. Only users in <group name> have access. [Details about adding users to the group.]
Not recommended

Time-out period exceeded.
Recommended

Time-out period (30s) exceeded. [Details about possible solution.]
...
  Explain how to fix the problem 

bookmark_border
Create actionable error messages. That is, after explaining the cause of the problem, explain how to fix the problem.

Not recommended

The client app on your device is no longer supported.
Recommended

The client app on your device is no longer supported. To update the client app, click the Update app button.

Provide examples 

bookmark_border
Supplement explanations with examples that illustrate how to correct the problem.

Not recommended

Invalid email address.
Recommended

The specified email address (robin) is missing an @ sign and a domain name. For example: robin@example.com.
Not recommended

Invalid input.
Recommended

Enter the pathname of a Windows executable file. An executable file ordinarily ends with the .exe suffix. For example: C:\Program Files\Custom Utilities\StringFinder.exe
Not recommended

Do not declare types in the initialization list.
Recommended

Do not declare types in the initialization list. Use calls instead, such as 'BankAccount(owner, IdNum, openDate)' rather than 'BankAccount(string owner, string IdNum, Date openDate)'
Not recommended

Syntax error on token "||", "if" expected.
Recommended

Syntax error in the "if" condition.
The condition is missing an outer pair of parentheses. Add a pair of bounding opening and closing parentheses to the condition. For example:
if  (a > 10) || (b == 0)  # Incorrect
if ((a > 10) || (b == 0)) # Correct
Multiple choice exercise
Which of the following error messages is best for an audience of people who drive cars?
The specified license plate (QB2 481) is invalid because license plates must start with three letters and end with three digits.
The specified license plate (QB2 481) is invalid. For example: MBR 918 and NRS 727 are both valid license plates.
The specified license plate (QB2 481) is invalid. Valid license plates start with three uppercase letters and end with three digits. For example: MBR 918 and NRS 727 are both valid license plates.
...
  Write Clearly

  Be concise 

bookmark_border
Write concise error messages. Emphasize what's important. Cut unnecessary text. See the Short sentences unit of Tech Writing One for tips on reducing sentence length.

Not recommended

Unable to establish connection to the SQL database. [Explanation of how to fix the issue.]
Recommended

Can't connect to the SQL database. [Explanation of how to fix the issue.]
Not recommended

The resource was not found and cannot be differentiated. What you selected doesn't exist in the cluster. [Explanation of how to find valid resources in the cluster.]
Recommended

Resource <name> isn't in cluster <name>. [Explanation of how to find valid resources in the cluster.]
Converting from passive voice to active voice often makes sentences conciser and easier to understand:

Not recommended

The Froobus operation is no longer supported by the Frambus app.
Recommended

The Frambus app no longer supports the Froobus operation.
In your enthusiasm to be concise, don't remove so many words that the resulting error message becomes cryptic. For example, don't reduce the preceding error message down to the following:

Not recommended

Unsupported.
...
  Avoid double negatives 

bookmark_border
A double negative is a sentence or phrase that contains two negative words, such as:

not, including contractions like can't, won't
no
Readers find double negatives hard to parse. ("Wait, do two negatives make a positive or is the author of the error message using two negatives to emphasize something I shouldn't do?")

Some double negatives in error messages are blatant:

Not recommended

You cannot not invoke this flag.
Recommended

You must invoke this flag.
Other double negatives are more subtle. For example, the words prevents and forbidding in the following error message are both negatives, leading to a confusing message:

Not recommended

The universal read permission on pathname prevents the operating system from forbidding access.
Recommended

The universal read permission on pathname enables anyone to read this file. Giving access to everyone is a security flaw. See hyperlink for details on how to restrict readers.
Similarly, avoid exceptions to exceptions.

Not recommended

The App Engine service account must have permissions on the image, except the Storage Object Viewer role, unless the Storage Object Admin role is available.
Recommended

The App Engine service account must have one of the following roles:
Storage Object Admin
Storage Object Creator

...
Write for the target audience 

bookmark_border
Tailor the error message to the target audience. That is:

Use appropriate terminology for that target audience.
Be mindful of what the target audience knows and doesn't know.
Beware of the curse of knowledge when writing error messages. A term familiar to you might not be familiar to your target audience. For example, the following error message contains terminology appropriate for a target audience of ML experts. If the target audience includes a significant number of people who aren't ML experts, then the error message is mystifying:

Recommended for ML experts only

Exploding gradient problem. To fix this problem, consider gradient clipping.
Now compare the following two error messages. The first error message contains technical truth, but terms like server, client, farm, and CPU are not going to help most consumers:

Inappropriate for shoppers

A server dropped your client's request because the server farm is running at 92% CPU capacity. Retry in five minutes.
The second error message is more suitable (and comforting) for a non-technical audience:

Appropriate for shoppers

So many people are shopping right now that our system can't complete your purchase. Don't worry--we won't lose your shopping cart. Please retry your purchase in five minutes.
...
  Use terminology consistently 

bookmark_border
Use terminology consistently for all error messages within a single product area. If you call something a "datastore" in one error message, then call the same thing a "datastore" in all the other error messages.

Not recommended

Can't connect to cluster at 127.0.0.1:56. Check whether minikube is running.
Recommended

Can't connect to minikube at 127.0.0.1:56. Check whether minikube is running.
Note: Some authoring systems automatically recommend synonyms to ensure that you don't keep repeating the same word. Yes, variety spices up paragraphs. However, variety in error messages can confuse users.
Error messages must appear consistently with similar formats and non-contradictory content; that is, the same problem must generate the same error message. For example, if different parts of an app each detect problems with internet connection, both parts should emit the same error message.
...
  Format error messages to enhance readability 

bookmark_border
A few simple techniques help error messages stand out from the surrounding text and code.

Link to more detailed documentation
When an error requires a lengthy explanation (for example, multiple sentences) and appropriate documentation is available, use links to redirect users to more detailed documentation.

Not recommended

Post contains unsafe information.
Recommended

Post contains unsafe information. Learn more about safety at <link to documentation>.
Use progressive disclosure
Some error messages are long, requiring a lot of text to explain the problem and solution. Unfortunately, users sometimes ignore long error messages, intimidated by the "wall of text." A good compromise is to display a briefer version of the error message and then give users the option to click something to get the full context.

Not recommended

TextField widgets require a Material widget ancestor, but none were located. In material design, most widgets are conceptually “printed” on a sheet of material. To introduce a Material widget, either directly include one or use a widget that contains a material itself.
Recommended

TextField widgets require a Material widget ancestor, but none were located.
...(Click to see more.)

  In material design, most widgets are conceptually "printed" on a sheet of material. To introduce a Material widget, either directly include one or use a widget that contains a material itself.
Place error messages close to the error
For coding errors, place error messages as close as possible to the place where the error occurred.

Not recommended


1: program figure_1;
2: Grade = integer;
3: var
4. print("Hello")
Use ':' instead of '=' when declaring a variable.
Recommended


1: program figure_1;
2: Grade = integer; 
---------^ Syntax Error
Use ':' instead of '=' when declaring a variable.
3: var
4. print("Hello")
Handle font colors carefully
A surprising percentage of readers are color blind, so be careful with colors in error messages. For example, the following error message will mystify some readers:

Not recommended

The argument expects only digits. Therefore, the supplied value is only partially correct: 3728LJ947
Many forms of color blindness exist, so just avoiding a red/green combination isn't sufficient. Because you can't depend on all your users being comfortable with color, we recommend pairing color with another visual cue. For example, the following error message pairs color with boldface:

Recommended

The argument expects only digits. Therefore, the highlighted part of the supplied value is incorrect: 3728LJ947
The following example pairs color with extra spaces:

Recommended

The argument expects only digits. Therefore, the highlighted part of the supplied value is incorrect: 3728  LJ  947
Alternatively, you could skip color completely:

Recommended

The argument expects only digits. Therefore, the highlighted characters in the supplied value are incorrect:

3728LJ947
    ^^
...
  Set the right tone 

bookmark_border
The tone of your error messages can have a significant effect on how your users interpret them.

Be positive
Instead of telling the user what they did wrong, tell the user how to get it right.

Not recommended

You didn't enter a name.
Recommended

Enter a name.
Not recommended

You entered an invalid postal code.
Recommended

Enter a valid postal code. [Explanation of valid postal code.]
Not recommended

ANSI C++ forbids declaration 'ostream' with no type 'ostream'.
Recommended

ANSI C++ requires a type for declaration 'ostream' with type 'ostream'.
Don't be overly apologetic
While maintaining positivity, avoid the words "sorry" or "please." Focus instead on clearly describing the problem and solution.

Note: Different cultures interpret apologies differently. Some cultures expect apologies in certain situations; other cultures find apologies from software corporations somewhat insincere. Although this lesson suggests avoiding apologies, be aware of your target audience's expectations.
Not recommended

We're sorry, a server error occurred and we're temporarily unable to load your spreadsheet. We apologize for the inconvenience. Please wait a while and try again.
Recommended

Google Docs is temporarily unable to open your spreadsheet. In the meantime, try right-clicking the spreadsheet in the doc list to download it.
Avoid humor
Don't attempt to make error messages humorous. Humor in error messages can fail for the following reasons:

Errors frustrate users. Angry users are generally not receptive to humor.
Users can misinterpret humor. (Jokes don't always cross borders well.)
Humor can detract from the goal of the error message.
Not recommended

Is the server running? Better go catch it :D.
Recommended

The server is temporarily unavailable. Try again in a few minutes.
Don't blame the user
If possible, focus the error message on what went wrong rather than assigning blame.

Not recommended

You specified a printer that's offline.
Recommended

The specified printer is offline.
...
`;
