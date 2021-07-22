const router=require('express').Router();
const verify=require('./verifyToken');
const Articlenew = require('../model/article');
// router.get('/new', verify , (req,res) =>{
//     res.render('articles/new')
//     });    


router.get('/new', (req,res) =>{
res.render('articles/new',{article: new Articlenew()});
});

router.get('/edit/:id', async (req,res) =>{
    const article = await Articlenew.findById(req.params.id)
    res.render('articles/edit',{article: article});
});
    

router.get('/:slug',async(req,res) =>{
    await Articlenew.findOne({slug: req.params.slug}).then((article)=>{
        if(article == null)  res.redirect('/')
        else  res.render('articles/show',{article: article})
    }).catch(err=>{
        res.redirect('/')
    });
   
   
})

router.post('/', async (req,res) => {
    try{
        
        const article = new Articlenew({
            title: req.body.title,
            tags: req.body.tags,
            description: req.body.description,
        })    
    const blogpost = await article.save();
   
     res.redirect(`/articles/${article.slug}`);    
    }
    catch (err){
        res.render('articles/new',{article: article})
        res.status(400).send(err);
    }
})

router.put('/:id',async (req,res)=>{
    try{
    const article = await Articlenew.findById(req.params.id)
    article.title=req.body.title,
    article.description=req.body.description
    const blogpost = await article.save();
    res.redirect(`/articles/${article.slug}`)}
    catch(err){
        res.render('articles/edit',{article: article})
        res.status(400).send(err);
    }
})

router.delete('/:id',async (req,res)=>{
    await Articlenew.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router;
