document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());

document.querySelectorAll('[data-show-answer]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const ans=btn.closest('.mini-quiz').querySelector('.answer');
    if(!ans) return;
    const open=ans.style.display==='block';
    ans.style.display=open?'none':'block';
    btn.textContent=open?'Show answer':'Hide answer';
  });
});

const quizForm=document.querySelector('#main-quiz');
if(quizForm){
  const progressFill=document.querySelector('.progress-fill');
  const progressText=document.querySelector('#progress-text');
  const scoreBox=document.querySelector('#score-box');
  const explanations=document.querySelector('#explanations');
  const answers={q1:'b',q2:'a',q3:'c',q4:'b',q5:'b',q6:'a',q7:'c',q8:'b'};
  const explain={
    q1:'Speed is distance divided by time, so 100 ÷ 20 = 5 m/s.',
    q2:'A force is a push or a pull.',
    q3:'Kinetic energy is the energy of movement.',
    q4:'Newton\'s First Law is about inertia.',
    q5:'Work = force × distance when the force moves the object.',
    q6:'The unit of force is the newton (N).',
    q7:'Gravity pulls objects toward Earth.',
    q8:'If distance stays the same and time decreases, speed increases.'
  };

  const updateProgress=()=>{
    const answered=[...quizForm.querySelectorAll('input[type="radio"]:checked')].length;
    const total=Object.keys(answers).length;
    const pct=(answered/total)*100;
    if(progressFill) progressFill.style.width=pct+'%';
    if(progressText) progressText.textContent=`${answered} / ${total} answered`;
  };
  quizForm.addEventListener('change',updateProgress);
  updateProgress();

  quizForm.addEventListener('submit',e=>{
    e.preventDefault();
    let score=0;
    explanations.innerHTML='';
    Object.entries(answers).forEach(([name,correct],i)=>{
      const checked=quizForm.querySelector(`input[name="${name}"]:checked`);
      const wrap=quizForm.querySelector(`[data-question="${name}"]`);
      wrap.querySelectorAll('.option').forEach(opt=>opt.classList.remove('correct','wrong'));
      if(checked){
        const option=checked.closest('.option');
        if(checked.value===correct){score++; option.classList.add('correct');}
        else option.classList.add('wrong');
        const correctInput=quizForm.querySelector(`input[name="${name}"][value="${correct}"]`);
        if(correctInput) correctInput.closest('.option').classList.add('correct');
      }
      const p=document.createElement('div');
      p.className='card';
      p.style.padding='16px';
      p.innerHTML=`<strong>Question ${i+1}:</strong> ${explain[name]}`;
      explanations.appendChild(p);
    });
    scoreBox.style.display='block';
    scoreBox.innerHTML=`<h3>Your score: ${score} / ${Object.keys(answers).length}</h3><p class="muted">Use the explanations below to review what you missed.</p>`;
  });

  document.querySelector('#reset-quiz')?.addEventListener('click',()=>{
    quizForm.reset();
    quizForm.querySelectorAll('.option').forEach(opt=>opt.classList.remove('correct','wrong'));
    explanations.innerHTML='';
    scoreBox.style.display='none';
    updateProgress();
  });
}

const feedbackForm=document.querySelector('#feedback-form');
if(feedbackForm){
  feedbackForm.addEventListener('submit',e=>{
    e.preventDefault();
    const status=document.querySelector('#feedback-status');
    status.textContent='Thank you. Your feedback has been recorded for project evaluation.';
    feedbackForm.reset();
  });
}
