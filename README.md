# dynamicallyCreatedForm
This is my first project of my ISTE 340 Client Programming and it was really really fun to make.

If you are on Rochester Institute Of Technology Campus or can VPN in, here is a link http://solace.ist.rit.edu/~mep4741/340/Assignment%2001/home.html 


Project Description:

      I was tasked with creating a sequence of selects based upon a choose
    your own adventure type set of data. The answer chosen decides what
    the next question will be. As you go thorugh the selects it dynamically 
    creates the next one, if you cange your decison on a previous select,
    it deletes the old selects and presents you with the question your latests
    choice leads you to.

      After you've chosen, it will display your choices as text and an svg cupcake
    image. You can still at any point chnage your answers in the selects and it 
    will react accordingly. 

      After it displays the choices, it displays a form that stores the first two 
    questions in cookies and the next two in local storage so that when you return,
    it will autofill your answers. For the required questions, if they do not have
    an answer, the form will not submit and they will turn red and be focused.

My Thoughts:

    I really enjoyed this project. I was daunted in the beginning, when we were seeing
    examples of finished projects, but that made my jump in and start right away. I was
    excited to see how I should to the project.
    
    Creating the selects dynamically and reading from a data set was something I had done
    before and was fun, but not too challening. Figuring out how to delete the selects 
    after a response was changed, was a bit harder. That was the challenge for this project.
    Especially after putting in the order and form section. My initial solution of just looping
    through and deleting objects after the select that was edited, was not going to be the best
    solution. 
    
    I decided to break up the page into two <section> tags, the selects and the form and order.
    Then I just looped throught to delete the remaining selects and deleted the second section
    block entirely. It was recreated with the new data when the user finished going through the
    selects.
    
    The local storage, cookies, and fetch were things that I have done before or done similar things
    and so they were fun, but also went pretty easily.
    
    I had a lot of fun with this project, I was talking about it and showing it to all my friends
    along the way. It is one of my favorite projects I've done.
