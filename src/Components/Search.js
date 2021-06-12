import React, { useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {
    ClickOutsideListener,
} from 'react-click-outside-listener';
export default function Search() {
    const inputref = React.createRef();
    const ratingref = React.createRef();
    const categoryref = React.createRef();
    const data = {
        "movie": [
            {
                "title": "The Matrix",
                "rating": "7.5",
                "category": "Action",
            },
            {
                "title": "Focus",
                "rating": "6.9",
                "category": "Comedy",
            },
            {
                "title": "The Lazarus Effect",
                "rating": "6.4",
                "category": "Thriller",
            },
            {
                "title": "Everly",
                "rating": "5.0",
                "category": "Action",
            },
            {
                "title": "Maps to the Stars",
                "rating": "7.5",
                "category": "Drama",
            }
        ]
    }
    const [category, setCategory] = useState(['Action', 'Comedy', 'Thriller', 'Drama'])
    const [Movie, setMovie] = useState(data.movie)
    const [title, setTitle] = useState('')
    const [filtercat, setFiltercat] = useState([])
    const [filterating, setFilterrating] = useState([])
    const [filterDataarrat, setFilterDataArray] = useState([])
    const searchDivClick = (e) => {
        setTitle(e.target.value)
        filterData(e.target.value)
        console.log(inputref.current)
        inputref.current.style.display = 'block'
    }
    const searchDivBlur = () => {
        inputref.current.style.display = 'none'
    }
    const searchDivBlur1 = () => {
        document.querySelector(".searchDiv1").style.display = 'none';
        document.querySelector(".searchDiv2").style.display = 'none';
    }
    const searchDivClick1 = () => {
        document.querySelector(".searchDiv1").style.display = 'block';
        document.querySelector(".searchDiv2").style.display = 'none';
    }
    const searchDivClick2 = () => {
        document.querySelector(".searchDiv2").style.display = 'block';
        document.querySelector(".searchDiv1").style.display = 'none';
    }
    const searchDivChange = (e) => {
        setTitle(e.target.value)
        filterData(e.target.value)
    }
    const ratting = (e) => {
        if (e.target.checked) {
            filterating.push(e.target.value)
        } else {
            const array = filterating;
            const index = array.indexOf(e.target.value);
            if (index > -1) {
                array.splice(index, 1);
            }
            setFilterrating(array)
        }

        filterData(title)
    }
    const categoryCheck = (e) => {
        if (e.target.checked) {
            filtercat.push(e.target.value)
        } else {
            const array = filtercat;
            const index = array.indexOf(e.target.value);
            if (index > -1) {
                array.splice(index, 1);
            }
            setFiltercat(array)
        }
        filterData(title)
    }

    const filterData = (title1) => {
        let a = filterByrating(Movie, filterating);
        let b = filterBycategory(Movie, filtercat);
        let d = filterByname(Movie, title1);
        let c = []
        let e = []
        if (d.length == 0) {
            e = Movie
        } else {
            e = d
        }
        if (a.length == 0 && b.length == 0) {
            if (filterating.length == 0 && filtercat == 0) {
                c = e;
            } else {
                c = [];
            }
        } else if (a.length != 0 && b.length == 0) {
            if (filtercat == 0) {
                c = e.filter(x => a.includes(x));
            } else {
                c = [];
            }
        } else if (a.length == 0 && b.length != 0) {
            if (filterating == 0) {
                c = e.filter(x => b.includes(x));
            } else {
                c = [];
            }

        } else if (a.length != 0 && b.length != 0) {
            c = e.filter(x => a.filter(x => b.includes(x)).includes(x));
        }
        setFilterDataArray(c)
    }

    const filterByrating = (arr1, arr2) => {
        let res = [];
        res = arr1.filter(el => {
            return arr2.find(element => {
                return element == Math.floor(el.rating);
            });
        });
        return res;
    }

    const filterBycategory = (arr1, arr2) => {
        let res = [];
        res = arr1.filter(el => {
            return arr2.find(element => {
                return element == el.category;
            });
        });
        return res;
    }

    const filterByname = (array1, title1) => {
        let items = array1.filter((data) => {
            if (title1 == '')
                return data
            else if (
                data.title.toLowerCase().includes(title1.toLowerCase())
            ) {
                return data
            }
        })
        return items
    }
    return (
        <div>
            <Header />
            <div className="container card margin-top">
                <div className="card-body">
                    <ClickOutsideListener onClickOutside={searchDivBlur}>
                        <div className="row">
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="Enter Movie Name"
                                    onClick={searchDivClick}
                                    onDoubleClick={searchDivBlur}
                                    onChange={searchDivChange}
                                />
                                <div className="searchDiv" ref={inputref}>
                                    {filterDataarrat.map((object, i) =>
                                        <div className="suggestion-item" key={i}>
                                            <span className="c-omni-suggestion-item__content">
                                                <div className="row">
                                                    <div className="col-md-8"> <b className="float-left"> {object.title}</b><br />
                                                        {object.rating.split('.')[0] == 1 ?
                                                            <label className="float-left" >
                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                {object.rating.split('.')[1] != 0 ?
                                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                    :
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                }
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                            </label>
                                                            :
                                                            object.rating.split('.')[0] == 2 ?
                                                                <label className="float-left" >
                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                    {object.rating.split('.')[1] != 0 ?
                                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                        :
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    }
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                </label>
                                                                : object.rating.split('.')[0] == 3 ?
                                                                    <label className="float-left" >
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        {object.rating.split('.')[1] != 0 ?
                                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                            :
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        }
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                    </label>
                                                                    :
                                                                    object.rating.split('.')[0] == 4 ?
                                                                        <label className="float-left" >
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                            {object.rating.split('.')[1] != 0 ?
                                                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                :
                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            }
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                        </label>
                                                                        :
                                                                        object.rating.split('.')[0] == 5 ?
                                                                            <label className="float-left" >
                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                <i className="fa fa-star" aria-hidden="true"></i>


                                                                                {object.rating.split('.')[1] != 0 ?
                                                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                    :
                                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                }
                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                            </label>
                                                                            :
                                                                            object.rating.split('.')[0] == 6 ?
                                                                                <label className="float-left" >
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star" aria-hidden="true"></i>

                                                                                    {object.rating.split('.')[1] != 0 ?
                                                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                        :
                                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                    }
                                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                </label>
                                                                                :
                                                                                object.rating.split('.')[0] == 7 ?
                                                                                    <label className="float-left" >
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star" aria-hidden="true"></i>

                                                                                        {object.rating.split('.')[1] != 0 ?
                                                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                            :
                                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                        }
                                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                    </label>
                                                                                    :
                                                                                    object.rating.split('.')[0] == 8 ?
                                                                                        <label className="float-left" >
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>

                                                                                            {object.rating.split('.')[1] != 0 ?
                                                                                                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                                :
                                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                            }
                                                                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                        </label>
                                                                                        :
                                                                                        object.rating.split('.')[0] == 9 ?
                                                                                            <label className="float-left" >
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                                {object.rating.split('.')[1] != 0 ?
                                                                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                                                                    :
                                                                                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                                }
                                                                                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                                                                            </label>
                                                                                            :
                                                                                            object.rating.split('.')[0] == 10 ?
                                                                                                <label className="float-left" >
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                                                                </label>
                                                                                                :
                                                                                                null
                                                        }
                                                    </div>
                                                    <div className="col-md-4"><b className="float-right">{object.category}</b></div>
                                                </div>
                                            </span>
                                        </div>
                                    )}

                                </div>

                            </div>
                            <div className="col-sm-4">
                                <ClickOutsideListener onClickOutside={searchDivBlur1}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" value="Rating" onClick={searchDivClick1} />
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" value="Genre" onClick={searchDivClick2} />
                                        </div>
                                    </div>
                                    <div className="searchDiv1" ref={ratingref}>
                                        <div className="suggestion-item">
                                            <span className="c-omni-suggestion-item__content">
                                                <div className="row">
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating1" name="rating" value="1" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating2" name="rating" value="2" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating3" name="rating" value="3" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating4" name="rating" value="4" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating5" name="rating" value="5" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating6" name="rating" value="6" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating7" name="rating" value="7" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating8" name="rating" value="8" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating9" name="rating" value="9" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i></label></span></div>
                                                    <div className="col-md-12"> <span className="float-left"><input type="checkbox" id="rating10" name="rating" value="10" onClick={ratting} /> <label ><i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i></label></span></div>

                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="searchDiv2" ref={categoryref}>
                                        <div className="suggestion-item">
                                            <span className="c-omni-suggestion-item__content">
                                                <div className="row">
                                                    {category.map((object, i) =>
                                                        <div className="col-md-12" key={i}> <span className="float-left"><input type="checkbox" id="cat" name="cat" value={object} onClick={categoryCheck} /> <label >{object}</label></span></div>
                                                    )}
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </ClickOutsideListener>
                            </div>
                        </div>
                    </ClickOutsideListener>
                </div>

            </div>
            <Footer />
        </div>
    )
}
