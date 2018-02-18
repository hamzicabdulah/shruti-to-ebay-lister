import * as React from 'react';
import { StatelessComponent } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { IAddedPicturesProps } from '../../../../../interfaces';

export const AddedPictures: StatelessComponent<any> = (props: IAddedPicturesProps) => {
    return (
        <div className='picturesDiv'>
            {props.pictureURLs.map((pictureURL, index) => (
                <Card className='picture' key={index}>
                    <CardMedia>
                        <img src={pictureURL} />
                    </CardMedia>
                    <CardActions>
                        <FlatButton label='Remove' onClick={() => props.removePictureURL(index)} />
                        <FlatButton label='Open' href={pictureURL} target='_blank' />
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}