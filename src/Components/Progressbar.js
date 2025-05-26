import React from 'react';
import { Flex } from 'antd';

const SegmentedProgress = ({ segments = 5, value = 0 , strok  }) => {
    const activeSegments = (value / 100) * segments;
    const filledCount = Math.floor(activeSegments);
    const partialFill = activeSegments - filledCount;

    

    return (
        <Flex gap={2}>
            {[...Array(segments)].map((_, index) => {
                const isFirst = index === 0;
                const isLast = index === segments - 1;
                const isFilled = index < filledCount;
                const isPartial = index === filledCount && partialFill > 0;

                return (
                    <div
                        key={index}
                        style={{
                            height: strok,
                            flex: 1,
                            backgroundColor: '#f0f0f0',
                            borderTopLeftRadius: isFirst ? 4 : 0,
                            borderBottomLeftRadius: isFirst ? 4 : 0,
                            borderTopRightRadius: isLast ? 4 : 0,
                            borderBottomRightRadius: isLast ? 4 : 0,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {(isFilled || isPartial) && (
                            <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: isPartial ? `${partialFill * 100}%` : '100%',
                                backgroundColor: "#33BDC4",
                                borderTopRightRadius: isLast || isPartial ? 4 : 0,
                                borderBottomRightRadius: isLast || isPartial ? 4 : 0,
                                transition: 'width 0.3s ease',
                            }}
                        />
                        
                        )}
                    </div>
                );
            })}
        </Flex>
    );
};

const Progressbar = ({ value , strok , compare }) => (
    <div className={`${compare ? "w-full md:w-11/12" : "w-[70%] sm:w-[260px] md:w-7/12 "} `} dir='ltr'>
        <SegmentedProgress value={value} strok={strok} />
    </div>
);

export default Progressbar;
