import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connectLocalization } from './Localization';
import PXTouchable from './PXTouchable';
import PXImage from './PXImage';
import OverlayBookmarkNovelButton from './OverlayBookmarkNovelButton';
import OverlayNovelPages from './OverlayNovelPages';
import OverlayMutedIndicator from './OverlayMutedIndicator';
import { globalStyleVariables } from '../styles';

const HIGHLIGHT_BORDER_WIDTH = 3;
const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
  },
  innerContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  muteContainer: {
    height: 120,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 75,
    height: 100,
  },
  highlight: {
    borderWidth: HIGHLIGHT_BORDER_WIDTH,
    borderColor: globalStyleVariables.HIGHLIGHT_COLOR,
  },
  subRightContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
  seriesTitle: {
    fontWeight: 'bold',
    color: globalStyleVariables.PRIMARY_COLOR,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  user: {
    color: '#696969',
  },
  info: {},
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    color: '#000',
    fontSize: 12,
  },
});

class NovelListViewItem extends Component {
  renderTags = tags =>
    <View style={styles.tagsContainer}>
      <Text style={styles.tag}>
        {tags.map(tag => tag.name).join('・')}
      </Text>
    </View>;

  render() {
    const {
      i18n,
      item,
      onPressItem,
      containerStyle,
      imageStyle,
      isHighlight,
      isMute,
    } = this.props;
    return (
      <View style={styles.container}>
        <PXTouchable
          style={[
            styles.innerContainer,
            containerStyle,
            isHighlight && styles.highlight,
          ]}
          onPress={onPressItem}
          disabled={isMute}
        >
          {isMute
            ? <View style={styles.muteContainer}>
                <OverlayMutedIndicator />
              </View>
            : <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                  <PXImage
                    uri={item.image_urls.square_medium}
                    style={[
                      {
                        resizeMode: 'cover',
                        flex: 1,
                      },
                      imageStyle,
                    ]}
                  />
                  {
                    <OverlayBookmarkNovelButton
                      item={item}
                      total={item.total_bookmarks}
                    />
                  }
                  {item.page_count > 1
                    ? <OverlayNovelPages total={item.page_count} />
                    : null}
                </View>
                <View style={styles.subRightContainer}>
                  {item.series &&
                    item.series.id &&
                    <Text style={[styles.text, styles.seriesTitle]}>
                      {item.series.title}
                    </Text>}
                  <Text style={[styles.text, styles.title]} ellipsisMode="tail">
                    {item.title}
                  </Text>
                  <Text style={[styles.text, styles.user]}>
                    by {item.user.name}
                  </Text>
                  <Text style={[styles.text, styles.info]}>
                    {`${item.text_length}${i18n.novelWords}`}
                  </Text>
                  {item.tags && item.tags.length
                    ? this.renderTags(item.tags)
                    : null}
                </View>
              </View>}
        </PXTouchable>
      </View>
    );
  }
}

export default connectLocalization(NovelListViewItem);
