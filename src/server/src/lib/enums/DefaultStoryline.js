import Storyline from '../enums/Storyline';
const defaultStories = [];
let story = {}
​
story[Storyline.TITLE] = "The king\'s rings";
story[Storyline.OPENING] = "Once upon a time there was a kingdom situated far far away. It was ruled by the glorious king Marcus and his beautiful wife Bianca. Their 20 years old daughter, Fiona, was devine and very much loved by everyone.";
story[Storyline.QUEST] = "One day Bianca disappeared... That is when the king proposed to give the famous 'king's ring' to the person who finds her, and would allow them to marry her.";
story[Storyline.ACTION1] = "The brave prince Brandon was very happy to go and find the missing princess. After climbing mountains and looking overseas for months, he finally found a castle with the sign 'I have the princess'. To enter the castle he had to pass the obstacle in front of him.";
story[Storyline.ACTION2] = "After passing the obstacle, he entered the castle. There he has to solve a riddle to unlock the door to the princess' bedroom.";
story[Storyline.ACTION3] = "She was not in the room, but he didn't give up! He knew that she was in there, somewhere. He started by looking at other rooms. All the rooms in this castle were locked. He has to go over an obstacle again...";
story[Storyline.ACTION4] = "After finding Fiona and declaring his love for her, he had to fight the evil dragon and bring Fiona back to safety. Before they got back into the kindgom, a kind man asked for help in solving the riddle, and in return he would help us pass over the bridge.";
story[Storyline.ENDING] = "In the end, after all of the challenges, Brandon was able to bring Fiona back home. With the king's approval, they decided to get married, and lived happily ever after.";
​
defaultStories.push(Object.assign({}, story));
​
​
story[Storyline.TITLE] = "Secret Dawson";
story[Storyline.OPENING] = "A very long time ago, under the heart of what is now called Dawson College, deep deep deep below the classroom which you study, an object was discovered. As the annual inspection took place, crawling beneath a dark sub-basement, the inspector noticed a loose rock in the original foundation.";
story[Storyline.QUEST] = "The inspector was curious about the mysterious object, and they would need your help to figure out the story behind it.";
story[Storyline.ACTION1] = "As they moved the rock, they noticed a box. Here are the clues that are in front of them. Can you figure out what this object symbolizes? It might not be what you think.";
story[Storyline.ACTION2] = "One more important detail to know about this building, is that originally it housed and educated a young community of women. It was first formed in 1663 by Marguerite Bourgeoys in what today is called Montreal. At first, the nuns allowed the women to move freely around the city until the rules changed, which caused the women to rebel. They created a secret system of communication amongst them. Can you figure out their secret communication system? Would you know what their message was? Try to figure it out.";
story[Storyline.ACTION3] = "As we try to figure out what this object symbolized, we must remember the original mission of this building; originally this was a convent of nuns. The main sacred doors of Sherbrooke was considered as a secret portal. Maybe the last clue will give you an idea. Remember: A stone represents endurance, perhaps all that happened in this building is a symbolism of stability after all those years...?";
story[Storyline.ACTION4] = "Lastly, the inspector has noticed an engraving on the stone. As they steps closer their glasses fall off of their face to a rapid descent. The glasses plummet towards the ground and shatter upon impact. The poor inspector cannot see what is written on the stone. Can you figure out what is on the stone?";
story[Storyline.ENDING] = "Not only have we learned more about the history of Dawson, but we also helped the inspector to familiarize themselves with the building's history.";
defaultStories.push(Object.assign({}, story));
​
story[Storyline.TITLE] = "The mysterious pineapple";
story[Storyline.OPENING] = "Yesterday I bought a pineapple from the supermarket and I brought it to my home. I set the pineapple onto the counter and left it there overnight to eat it the next day. When I woke up in the morning, the pineapple had disappeared.";
story[Storyline.QUEST] = "I am going to find out what happened to this pineapple if it's the last thing I do.";
story[Storyline.ACTION1] = "Aha! I've got it. I'll go check the security footage that I installed in my house. As I step closer to my computer room to check on the cameras. I noticed that the door handle was broken, and there is a letter on the door. What does it say?";
story[Storyline.ACTION2] = "With this new information we can now check what's on the computer. As I pull up the footage for my security cameras I can see that my pineapple has not moved in the last three hours. But wait! There's a shadow. Who or what is this mysterious being? It looks like the shadow of a person, but there is also a tail. As I'm watching the footage, I see there's a post-it note on my monitor. Maybe this is another clue! What does it say?";
story[Storyline.ACTION3] = "Now that we have these two clues, we are getting closer to figuring out what happened to pineapple. I should continue watching the footage to see what this half-human half-cat is doing in my house and why is they are trying to get my pineapple. How did they even get in? I should go check my front door. I stop the footage to go check my front door. Nothing seems wrong, all the hinges are intact, and nobody has tried to enter my home from the front entrance. I should go check the back entrance, see if there's anything over there. I see that there is a letter on my back entrance. Can you figure out what's written in the letter?";
story[Storyline.ACTION4] = "Alright, that's it, I'm just going to watch the the rest of the security footage and see what actually stole my pineapple. I press play on the footage, and this shadow keeps coming close to my pineapple, but it never actually comes towards my pineapple. Finally after 2 hours of the shadow moving around pineapple, There is a person who reaches for my pineapple and steals it. I stop the footage, and zoom into the person's face. I know this person... That's Jamie! My landlord. The tail I saw is the toilet paper sticking out of their pants. I wonder if Jamie had that there all day? Why is Jamie in my apartment? Oh yes, today is Tuesday, Jamie comes to get the mail on Tuesday's, but why did Jamie take my pineapple? I see Jamie holding a sign, but why? What does it read?"
story[Storyline.ENDING] = "Today we finally learnt why Jamie stole my pineapple. Jamie was trying to make me a fruit platter for my birthday and saw my pineapple in my kitchen when they came for the mail. How nice of Jamie to make a fruit platter for me. Wait, that's actually not nice. They used my fruits! Jamie!!";
defaultStories.push(Object.assign({}, story));
​
export default defaultStories;