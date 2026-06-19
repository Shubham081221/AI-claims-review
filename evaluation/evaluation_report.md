# Operational Analysis

## Model Calls

Claim Extraction:
1 Gemini call per claim

Vision Analysis:
1-3 Gemini calls per claim

Estimated Test Set Calls:
44 claim calls
~110 image calls

Total:
~154 calls

## Optimization

- Claim extraction caching
- Image analysis caching
- Batch image processing
- Retry handling

## Latency

Average:
2-5 seconds per claim

Estimated:
3-8 minutes for full dataset

## Cost

Gemini Flash pricing assumed.


Development performed on subset batches to reduce API usage.
