import React, { Component } from 'react';
import Slider from 'react-slick';
import Artist from '../components/Artist';

export default class ArtistSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.artists.map(artist => <Artist key={artist.id} artistData={artist} setModalArtistData={this.props.setModalArtistData} />)}
        </Slider>
      </div>
    );
  }
}