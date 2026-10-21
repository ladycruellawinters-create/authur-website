# Cedar Hollow creature quiz

`cedar-quiz.html` is linked from homepage Reader extras and the Cedar Hollow lore page. Edition two includes all sixteen author-supplied types: ghost, werewolf, witch, wizard, human, genie, gnome, cat, magpie, fairy, pegasus, gorgon, dragon, vampire, scarecrow and merfolk. No resident identities, manuscript scenes or plot revelations appear. Result descriptions are playful personality matches, not additional canon about supernatural abilities or rules.

`cedar-quiz-data.js` contains the edition, creature descriptions and questions. To introduce a creature after a new book, add its entry and a distinct six-choice affinity profile, then check that its ideal choices produce a unique win; check all existing descriptions and invitations for spoilers. Do not expose private author notes as result content. Refresh copy and increment the edition when appropriate.

`cedar-quiz.js` renders semantic radio groups, rotates answer positions, counts completed questions and compares the six answers with each creature’s six-choice affinity profile, awarding one point per matching choice. Equal top scores lead to a choice among only the tied creatures; there is no hidden priority or random winner. Reset clears answers and the displayed result. Copy shares result text plus the canonical quiz URL; manual text selection is available if clipboard permission is denied. Shared links open the quiz, not a preselected result. Answers are not stored or transmitted.

Run `node --test tests/cedar-quiz.test.cjs` when extending the data. Browser checks should cover every result, ties, reset, keyboard focus, clipboard fallback and mobile width.

The author supplied this expanded list on 21 October 2026. Cats and magpies are results in their own right; do not imply they are secretly another species or explain a curse. Keep witch and wizard as separate inclusive outcomes, without assigning them by gender. Humans are equally welcome. These personality profiles do not establish powers, weaknesses, origins or identities.
