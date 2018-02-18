import * as React from 'react';
import { StatelessComponent } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { IDescriptionPreviewProps } from '../../../../../interfaces';

export const DescriptionPreview: StatelessComponent<any> = (props: IDescriptionPreviewProps) => {
    return (
        <Card className='card'>
            <CardText className='cardText'>
                <h3>DESCRIPTION PREVIEW</h3>
                <div dangerouslySetInnerHTML={{ __html: props.description }} />
            </CardText>
        </Card>
    );
}