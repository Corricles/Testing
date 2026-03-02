import { Question } from '@/lib/types';

const vocabQuestions: Question[] = [
  { id: 'v1', type: 'mcq_vocab', cefr_level: 'A1', difficulty_score: 12, prompt: 'Choose the synonym of "big".', options: ['small', 'large', 'late', 'light'], correct_answer: 'large' },
  { id: 'v2', type: 'mcq_vocab', cefr_level: 'A1', difficulty_score: 15, prompt: 'Choose the opposite of "cold".', options: ['cool', 'warm', 'hard', 'dark'], correct_answer: 'warm' },
  { id: 'v3', type: 'mcq_vocab', cefr_level: 'A2', difficulty_score: 28, prompt: 'A person who designs buildings is an ____.', options: ['architect', 'artist', 'author', 'athlete'], correct_answer: 'architect' },
  { id: 'v4', type: 'mcq_vocab', cefr_level: 'A2', difficulty_score: 34, prompt: 'Choose the best word: "I need to ____ a decision."', options: ['do', 'make', 'take', 'bring'], correct_answer: 'make' },
  { id: 'v5', type: 'mcq_vocab', cefr_level: 'A2', difficulty_score: 39, prompt: '"Reliable" means...', options: ['often late', 'can be trusted', 'very loud', 'expensive'], correct_answer: 'can be trusted' },
  { id: 'v6', type: 'mcq_vocab', cefr_level: 'B1', difficulty_score: 52, prompt: 'Choose the word closest to "improve".', options: ['decline', 'enhance', 'delay', 'ignore'], correct_answer: 'enhance' },
  { id: 'v7', type: 'mcq_vocab', cefr_level: 'B1', difficulty_score: 58, prompt: '"Affordable" housing is housing that is...', options: ['easy to clean', 'cheap enough to buy', 'very modern', 'located downtown'], correct_answer: 'cheap enough to buy' },
  { id: 'v8', type: 'mcq_vocab', cefr_level: 'B1', difficulty_score: 63, prompt: 'Choose the correct meaning of "outcome".', options: ['entrance', 'result', 'method', 'argument'], correct_answer: 'result' },
  { id: 'v9', type: 'mcq_vocab', cefr_level: 'B2', difficulty_score: 76, prompt: 'Choose the closest meaning of "allocate".', options: ['divide and assign', 'accuse publicly', 'write quickly', 'reduce interest'], correct_answer: 'divide and assign' },
  { id: 'v10', type: 'mcq_vocab', cefr_level: 'B2', difficulty_score: 82, prompt: '"Inevitable" means...', options: ['avoidable', 'certain to happen', 'surprising', 'temporary'], correct_answer: 'certain to happen' },
];

const grammarQuestions: Question[] = [
  { id: 'g1', type: 'mcq_grammar', cefr_level: 'A1', difficulty_score: 10, prompt: 'She ____ to school every day.', options: ['go', 'goes', 'going', 'gone'], correct_answer: 'goes' },
  { id: 'g2', type: 'mcq_grammar', cefr_level: 'A1', difficulty_score: 18, prompt: 'They ____ from Spain.', options: ['is', 'am', 'are', 'be'], correct_answer: 'are' },
  { id: 'g3', type: 'mcq_grammar', cefr_level: 'A2', difficulty_score: 30, prompt: 'I ____ TV when you called.', options: ['watched', 'was watching', 'watch', 'am watching'], correct_answer: 'was watching' },
  { id: 'g4', type: 'mcq_grammar', cefr_level: 'A2', difficulty_score: 36, prompt: 'If it rains, we ____ home.', options: ['stay', 'stayed', 'will stay', 'stays'], correct_answer: 'will stay' },
  { id: 'g5', type: 'mcq_grammar', cefr_level: 'A2', difficulty_score: 40, prompt: 'This is the boy ____ won the prize.', options: ['which', 'who', 'where', 'whose'], correct_answer: 'who' },
  { id: 'g6', type: 'mcq_grammar', cefr_level: 'B1', difficulty_score: 54, prompt: 'By next year, I ____ here for five years.', options: ['work', 'will have worked', 'am working', 'worked'], correct_answer: 'will have worked' },
  { id: 'g7', type: 'mcq_grammar', cefr_level: 'B1', difficulty_score: 60, prompt: 'I wish I ____ more free time.', options: ['have', 'had', 'will have', 'having'], correct_answer: 'had' },
  { id: 'g8', type: 'mcq_grammar', cefr_level: 'B1', difficulty_score: 66, prompt: 'The report ____ by Monday.', options: ['must finish', 'must be finished', 'must finished', 'must be finish'], correct_answer: 'must be finished' },
  { id: 'g9', type: 'mcq_grammar', cefr_level: 'B2', difficulty_score: 78, prompt: 'Hardly ____ the meeting started when the fire alarm rang.', options: ['had', 'has', 'did', 'was'], correct_answer: 'had' },
  { id: 'g10', type: 'mcq_grammar', cefr_level: 'B2', difficulty_score: 84, prompt: 'Not only ____ late, but he also forgot the documents.', options: ['he arrived', 'did he arrive', 'he did arrive', 'arrived he'], correct_answer: 'did he arrive' },
];

const gapQuestions: Question[] = [
  { id: 'gap1', type: 'gap', cefr_level: 'A1', difficulty_score: 14, prompt: 'I have ____ apple in my bag.', options: ['a', 'an', 'the', 'no article'], correct_answer: 'an' },
  { id: 'gap2', type: 'gap', cefr_level: 'A1', difficulty_score: 20, prompt: 'We usually get up ____ 7 o\'clock.', options: ['at', 'in', 'on', 'by'], correct_answer: 'at' },
  { id: 'gap3', type: 'gap', cefr_level: 'A2', difficulty_score: 27, prompt: 'She is interested ____ music.', options: ['in', 'on', 'at', 'for'], correct_answer: 'in' },
  { id: 'gap4', type: 'gap', cefr_level: 'A2', difficulty_score: 33, prompt: 'There aren\'t ____ apples left.', options: ['many', 'much', 'some', 'a'], correct_answer: 'many' },
  { id: 'gap5', type: 'gap', cefr_level: 'A2', difficulty_score: 42, prompt: 'I\'ve lived here ____ 2019.', options: ['for', 'since', 'during', 'from'], correct_answer: 'since' },
  { id: 'gap6', type: 'gap', cefr_level: 'B1', difficulty_score: 50, prompt: 'If I ____ enough money, I\'d travel more.', options: ['have', 'had', 'will have', 'having'], correct_answer: 'had' },
  { id: 'gap7', type: 'gap', cefr_level: 'B1', difficulty_score: 57, prompt: 'The film was so boring that we ____ left early.', options: ['finally', 'already', 'hardly', 'yet'], correct_answer: 'finally' },
  { id: 'gap8', type: 'gap', cefr_level: 'B1', difficulty_score: 64, prompt: 'He denied ____ the window.', options: ['break', 'to break', 'breaking', 'broken'], correct_answer: 'breaking' },
  { id: 'gap9', type: 'gap', cefr_level: 'B2', difficulty_score: 74, prompt: 'No sooner had we sat down ____ the lights went out.', options: ['than', 'when', 'that', 'then'], correct_answer: 'than' },
  { id: 'gap10', type: 'gap', cefr_level: 'B2', difficulty_score: 80, prompt: 'It\'s high time you ____ responsibility.', options: ['take', 'took', 'taken', 'taking'], correct_answer: 'took' },
];

const readingQuestions: Question[] = [
  { id: 'r1', type: 'reading_mcq', cefr_level: 'A1', difficulty_score: 16, passage: 'Tom goes to work by bus every morning. Today the bus was late, so Tom arrived at 9:15.', prompt: 'How did Tom travel to work?', options: ['By car', 'By train', 'By bus', 'On foot'], correct_answer: 'By bus' },
  { id: 'r2', type: 'reading_mcq', cefr_level: 'A1', difficulty_score: 22, passage: 'Anna likes tea but doesn\'t like coffee. At the cafe, she ordered green tea.', prompt: 'What did Anna order?', options: ['Coffee', 'Juice', 'Green tea', 'Water'], correct_answer: 'Green tea' },
  { id: 'r3', type: 'reading_mcq', cefr_level: 'A2', difficulty_score: 29, passage: 'The museum opens at 10 a.m. and closes at 6 p.m. On Sundays it closes at 4 p.m.', prompt: 'When does it close on Sundays?', options: ['4 p.m.', '6 p.m.', '10 a.m.', 'Noon'], correct_answer: '4 p.m.' },
  { id: 'r4', type: 'reading_mcq', cefr_level: 'A2', difficulty_score: 35, passage: 'Sara studied hard for her exam. She passed with a very high score.', prompt: 'Why did Sara pass?', options: ['She was lucky', 'She studied hard', 'The exam was cancelled', 'She guessed answers'], correct_answer: 'She studied hard' },
  { id: 'r5', type: 'reading_mcq', cefr_level: 'A2', difficulty_score: 44, passage: 'The city plans to add more bike lanes to reduce traffic and pollution.', prompt: 'Why add more bike lanes?', options: ['To increase traffic', 'To reduce traffic and pollution', 'To close roads', 'To raise fuel prices'], correct_answer: 'To reduce traffic and pollution' },
  { id: 'r6', type: 'reading_mcq', cefr_level: 'B1', difficulty_score: 53, passage: 'A local startup created an app that helps users track daily habits. After three months, many users reported better routines.', prompt: 'What was one reported result?', options: ['Users deleted the app quickly', 'Users developed better routines', 'The app stopped working', 'No one used the app'], correct_answer: 'Users developed better routines' },
  { id: 'r7', type: 'reading_mcq', cefr_level: 'B1', difficulty_score: 61, passage: 'Although the weather forecast predicted rain, the event stayed dry and attendance exceeded expectations.', prompt: 'What happened at the event?', options: ['It was cancelled', 'Attendance was low', 'It rained heavily', 'Attendance was higher than expected'], correct_answer: 'Attendance was higher than expected' },
  { id: 'r8', type: 'reading_mcq', cefr_level: 'B1', difficulty_score: 68, passage: 'The company introduced flexible hours. Employees could start between 7 and 10 a.m., which improved morale.', prompt: 'What improved after flexible hours?', options: ['Sales only', 'Morale', 'Office rent', 'Meeting length'], correct_answer: 'Morale' },
  { id: 'r9', type: 'reading_mcq', cefr_level: 'B2', difficulty_score: 75, passage: 'Researchers caution that while AI tools increase efficiency, overreliance may weaken independent problem-solving skills.', prompt: 'What risk is highlighted?', options: ['Higher costs', 'Weaker independent problem-solving', 'Less efficiency', 'Slower internet'], correct_answer: 'Weaker independent problem-solving' },
  { id: 'r10', type: 'reading_mcq', cefr_level: 'B2', difficulty_score: 85, passage: 'Despite initial resistance, the policy gained support after evidence showed long-term environmental and economic benefits.', prompt: 'Why did support increase?', options: ['People were forced', 'Evidence showed long-term benefits', 'The policy was removed', 'Costs doubled'], correct_answer: 'Evidence showed long-term benefits' },
];

const listeningQuestions: Question[] = [
  { id: 'l1', type: 'listening_mcq', cefr_level: 'A1', difficulty_score: 18, prompt: 'What time is the meeting?', options: ['9:00', '10:30', '12:00', '3:15'], correct_answer: '10:30', audio_src: '/audio/listening-a1-1.mp3', audio_duration_sec: 12 },
  { id: 'l2', type: 'listening_mcq', cefr_level: 'A1', difficulty_score: 23, prompt: 'What did the speaker buy?', options: ['Milk and bread', 'A jacket', 'A phone', 'A ticket'], correct_answer: 'Milk and bread', audio_src: '/audio/listening-a1-2.mp3', audio_duration_sec: 13 },
  { id: 'l3', type: 'listening_mcq', cefr_level: 'A2', difficulty_score: 31, prompt: 'Where are they going this weekend?', options: ['The beach', 'The mountains', 'A museum', 'A concert'], correct_answer: 'The mountains', audio_src: '/audio/listening-a2-1.mp3', audio_duration_sec: 15 },
  { id: 'l4', type: 'listening_mcq', cefr_level: 'A2', difficulty_score: 37, prompt: 'Why is the woman late?', options: ['She overslept', 'Traffic jam', 'Lost keys', 'Missed bus'], correct_answer: 'Traffic jam', audio_src: '/audio/listening-a2-2.mp3', audio_duration_sec: 14 },
  { id: 'l5', type: 'listening_mcq', cefr_level: 'A2', difficulty_score: 46, prompt: 'What does the manager ask staff to do?', options: ['Work overtime daily', 'Submit reports by Friday', 'Cancel meetings', 'Take unpaid leave'], correct_answer: 'Submit reports by Friday', audio_src: '/audio/listening-a2-3.mp3', audio_duration_sec: 17 },
  { id: 'l6', type: 'listening_mcq', cefr_level: 'B1', difficulty_score: 55, prompt: 'What is the main complaint?', options: ['High prices', 'Delayed delivery', 'Rude staff', 'Wrong item color'], correct_answer: 'Delayed delivery', audio_src: '/audio/listening-b1-1.mp3', audio_duration_sec: 19 },
  { id: 'l7', type: 'listening_mcq', cefr_level: 'B1', difficulty_score: 62, prompt: 'What solution is proposed?', options: ['Hire two interns', 'Move deadline', 'Offer hybrid schedule', 'Reduce services'], correct_answer: 'Offer hybrid schedule', audio_src: '/audio/listening-b1-2.mp3', audio_duration_sec: 18 },
  { id: 'l8', type: 'listening_mcq', cefr_level: 'B1', difficulty_score: 69, prompt: 'What does the speaker recommend first?', options: ['Buying new software', 'Running a pilot test', 'Changing the manager', 'Outsourcing support'], correct_answer: 'Running a pilot test', audio_src: '/audio/listening-b1-3.mp3', audio_duration_sec: 20 },
  { id: 'l9', type: 'listening_mcq', cefr_level: 'B2', difficulty_score: 77, prompt: 'What is implied about the project?', options: ['It lacks funding', 'It exceeded expectations', 'It was cancelled', 'It is behind schedule'], correct_answer: 'It exceeded expectations', audio_src: '/audio/listening-b2-1.mp3', audio_duration_sec: 22 },
  { id: 'l10', type: 'listening_mcq', cefr_level: 'B2', difficulty_score: 83, prompt: 'What concern does the analyst raise?', options: ['Market saturation risk', 'Weather disruptions', 'Server downtime', 'Currency bans'], correct_answer: 'Market saturation risk', audio_src: '/audio/listening-b2-2.mp3', audio_duration_sec: 24 },
];

const speakingQuestions: Question[] = [
  { id: 's1', type: 'speaking', cefr_level: 'A1', difficulty_score: 20, prompt: 'Describe your daily routine.', speaking_prompt: 'Mention at least morning, work/school, evening.', correct_answer: ['morning', 'work', 'evening'] },
  { id: 's2', type: 'speaking', cefr_level: 'A1', difficulty_score: 24, prompt: 'Talk about your family.', speaking_prompt: 'Mention number of people and one activity together.', correct_answer: ['family', 'people', 'together'] },
  { id: 's3', type: 'speaking', cefr_level: 'A2', difficulty_score: 32, prompt: 'Describe your hometown.', speaking_prompt: 'Mention location, weather, and one place to visit.', correct_answer: ['location', 'weather', 'place'] },
  { id: 's4', type: 'speaking', cefr_level: 'A2', difficulty_score: 38, prompt: 'Explain your favorite hobby.', speaking_prompt: 'Say why you like it and when you do it.', correct_answer: ['why', 'like', 'when'] },
  { id: 's5', type: 'speaking', cefr_level: 'A2', difficulty_score: 45, prompt: 'Describe a memorable trip.', speaking_prompt: 'Mention destination, transport, and highlight.', correct_answer: ['destination', 'transport', 'highlight'] },
  { id: 's6', type: 'speaking', cefr_level: 'B1', difficulty_score: 52, prompt: 'Discuss pros and cons of online learning.', speaking_prompt: 'Give at least one advantage and one challenge.', correct_answer: ['advantage', 'challenge', 'online'] },
  { id: 's7', type: 'speaking', cefr_level: 'B1', difficulty_score: 59, prompt: 'Tell about a time you solved a problem.', speaking_prompt: 'Mention problem, action, result.', correct_answer: ['problem', 'action', 'result'] },
  { id: 's8', type: 'speaking', cefr_level: 'B1', difficulty_score: 67, prompt: 'Describe a useful piece of technology.', speaking_prompt: 'Explain function and impact.', correct_answer: ['function', 'impact', 'technology'] },
  { id: 's9', type: 'speaking', cefr_level: 'B2', difficulty_score: 76, prompt: 'Give your view on remote work trends.', speaking_prompt: 'Include productivity, communication, and future.', correct_answer: ['productivity', 'communication', 'future'] },
  { id: 's10', type: 'speaking', cefr_level: 'B2', difficulty_score: 86, prompt: 'Discuss how cities can become more sustainable.', speaking_prompt: 'Include transport, energy, and policy.', correct_answer: ['transport', 'energy', 'policy'] },
];

export const QUESTION_BANK: Question[] = [
  ...vocabQuestions,
  ...grammarQuestions,
  ...gapQuestions,
  ...readingQuestions,
  ...listeningQuestions,
  ...speakingQuestions,
];
