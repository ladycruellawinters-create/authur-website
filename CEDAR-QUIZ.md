# Cedar Hollow creature quiz

`cedar-quiz.html` is linked from homepage Reader extras and the Cedar Hollow lore page. First edition: vampire, werewolf and witch, all already mentioned in public series copy. No resident identities, manuscript scenes or plot revelations appear. Result descriptions are playful personality matches, not additional canon about supernatural abilities or rules.

`cedar-quiz-data.js` contains the edition, creature descriptions and questions. To introduce a creature after a new book, add its entry and one equally weighted answer to every question; check all existing descriptions and invitations for spoilers. Do not expose private author notes as result content. Refresh copy and increment the edition when appropriate.

`cedar-quiz.js` renders semantic radio groups, rotates answer positions, counts completed questions and scores one point per answer. Equal top scores lead to a choice among only the tied creatures; there is no hidden priority or random winner. Reset clears answers and the displayed result. Copy shares result text plus the canonical quiz URL; manual text selection is available if clipboard permission is denied. Shared links open the quiz, not a preselected result. Answers are not stored or transmitted.

Run `node --test tests/cedar-quiz.test.cjs` when extending the data. Browser checks should cover every result, ties, reset, keyboard focus, clipboard fallback and mobile width.
