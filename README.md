# dynamicallyCreatedForm
This is my first project of my ISTE 340 Client Programming and it was really really fun to make.

If you are on Rochester Institute Of Technology Campus or can VPN in, here is a link http://solace.ist.rit.edu/~mep4741/340/Assignment%2001/home.html 


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
